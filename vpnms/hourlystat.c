/*
 *   VPN Management System
 *   Copyright (C) 2005-2010  Andrey Chebotarev <admin@vpnms.org>
 *   All rights reserved.
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


#include "vpnms.h"

myint hourly_sum_bytes (char *port, char *mode, char *direction, unsigned long int StartTime, unsigned long int EndTime, char *username)
{
	char				*query;
	char				*colum;
	char				*port_dst;
	MYSQL_RES			*res;
	MYSQL_ROW			row;
	int					local_flow;

	query = malloc(1024);

	if ( (0 == strcasecmp (mode, "input")) || (0 == strcasecmp (mode, "local_input")) )
	{
		colum = "DstIp";
		port_dst = "SrcPort";
	}
	if ( (0 == strcasecmp (mode, "output")) || (0 == strcasecmp (mode, "local_output")) )
	{
		colum = "SrcIp";
		port_dst = "DstPort";
	}

	if(0 == strcasecmp(direction, "internet"))
		local_flow = 0;
	if(0 == strcasecmp(direction, "local"))
		local_flow = 1;

	if (0 == strcasecmp (port, "all"))
	{
		sprintf(query,
			"SELECT SUM(Bytes) AS Bytes FROM `flows` WHERE `TimeStamp` > %lu AND `TimeStamp` < %lu AND `Owner` = '%s' AND `%s` LIKE '10.%%.%%.%%' AND `local` = %u",
			StartTime, EndTime, username, colum, local_flow
			);
	}
	else if (0 == strcasecmp (port, "other"))
	{
		sprintf(query,
			"SELECT SUM(Bytes) AS Bytes FROM `flows` WHERE `TimeStamp` > %lu AND `TimeStamp` < %lu AND `Owner` = '%s' AND `%s` LIKE '10.%%.%%.%%' "
			"AND %s != 80 AND %s != 443 AND %s != 22 AND %s != 5190 AND %s != 25 AND %s != 465 AND %s != 110 AND %s != 995 AND %s != 143 AND %s != 993 "
			"AND %s != 585 AND %s != 53 AND `local` = %u",
			StartTime, EndTime, username, colum, port_dst, port_dst, port_dst, port_dst, port_dst, port_dst, port_dst, port_dst, port_dst, port_dst,
			port_dst, port_dst, local_flow
			);
	}
	else
	{
		sprintf(query,
			"SELECT SUM(Bytes) AS Bytes FROM `flows` WHERE `TimeStamp` > %lu AND `TimeStamp` < %lu AND `Owner` = '%s' AND `%s` LIKE '10.%%.%%.%%' AND `%s` = %s AND `local` = %u",
			StartTime, EndTime, username, colum, port_dst, port, local_flow
			);
	}

	res = exec_query(query);
	row = mysql_fetch_row(res);

	int nRes = 0;

	if ( row[ 0 ] )
	{
		nRes = atoll( row[0] );
	}

	mysql_free_result(res);

	return nRes;
}

int main ()
{
	char				*query;
	unsigned long int	StartTime;
	unsigned long int	EndTime;
	unsigned long int	DelDate;
	MYSQL_RES			*res;
	MYSQL_ROW			row;
	long unsigned int	rows = 0;
	char				*username;
	time_t				t;
	struct tm			*gm;
	unsigned int		min;
	unsigned int		sec;
	unsigned long int timestamp;
	static int			lockfd;
	myint				HTTPin, HTTPout, HTTPSin, HTTPSout, SSHin, SSHout, ICQin, ICQout, SMTPin, SMTPout,
	SSMTPin, SSMTPout, POP3in, POP3out, POP3Sin, POP3Sout, IMAPin, IMAPout, IMAPSin, IMAPSout, IMAPSSLin, IMAPSSLout, DNSin, DNSout,
	OTHERin, OTHERout, ALLin, ALLout;

    /*
     *  пробуем открыть лок-файл, если нету - создаем и лочим
     *  если есть - пробуем лочить, если не лочится - выходим
     *  если лочится - продолжаем
     */
    lockfd = open (HSTLOCKF, O_RDWR);

    if (lockfd == -1)
    {
    	close(lockfd);

    	lockfd = open (HSTLOCKF, O_WRONLY | O_CREAT, 0640);

        if (lockfd == -1)
        {
        	syslog (LOG_ERR, " error in open %s", HSTLOCKF);
        	printf(" error in open %s", HSTLOCKF);

        	exit(EXIT_FAILURE);
        }

        if ( lockf(lockfd, F_TLOCK, 0) < 0)
        {
        	syslog (LOG_ERR, " error in lock %s", HSTLOCKF);
        	printf(" error in lock %s", HSTLOCKF);

        	exit(EXIT_FAILURE);
        }
    }
    else
    {
    	if ( lockf(lockfd, F_TLOCK, 0) < 0)
    	{
    		syslog (LOG_ERR, " already working");
    		printf("already working\n");

    		exit(EXIT_FAILURE);
    	}
    }

	//loading config
    vpnms_config = LoadConfig();

	//вычисляем диапазон времени, который обрабатывать
	EndTime = (unsigned long)time(NULL);
	StartTime = EndTime - 3600;

	//вычисляем timestemp текущего часа без секунд и минут (в GMT)
	t = time(NULL);
	gm = gmtime(&t);
	min = gm->tm_min;
	sec = gm->tm_sec;
	timestamp = (unsigned long)time(NULL);
	timestamp = timestamp - min*60 - sec;

   	//удаляем записи, которые могли остаться после простоя сервера
	query = malloc(512);
	sprintf(query, "DELETE FROM `flows` WHERE `TimeStamp` < %lu", StartTime);
	exec_query(query);

	while(1)
	{
		//выбираем первую попавшуюся запись из нужного диапазона и смотрим имя владельца
    	query = malloc(256);
    	sprintf(query, "SELECT `flows`.`Owner` FROM `flows` WHERE `TimeStamp` > %lu AND `TimeStamp` < %lu LIMIT 1", StartTime, EndTime);
    	res = exec_query(query);
    	rows = mysql_num_rows(res);

    	//если не осталось не обработанных записей - выходим из цикла
    	if (rows < 1) break;

    	row = mysql_fetch_row(res);
    	username = strdup(row[0]);
    	mysql_free_result(res);

    	//интернет трафик

    	HTTPin = hourly_sum_bytes("80", "input", "internet", StartTime, EndTime, username);
    	HTTPSin = hourly_sum_bytes("443", "input", "internet", StartTime, EndTime, username);
    	SSHin = hourly_sum_bytes("22", "input", "internet", StartTime, EndTime, username);
    	ICQin = hourly_sum_bytes("5190", "input", "internet", StartTime, EndTime, username);
    	SMTPin = hourly_sum_bytes("25", "input", "internet", StartTime, EndTime, username);
    	SSMTPin = hourly_sum_bytes("465", "input", "internet", StartTime, EndTime, username);
    	POP3in = hourly_sum_bytes("110", "input", "internet", StartTime, EndTime, username);
    	POP3Sin = hourly_sum_bytes("995", "input", "internet", StartTime, EndTime, username);
    	IMAPin = hourly_sum_bytes("143", "input", "internet", StartTime, EndTime, username);
      	IMAPSin = hourly_sum_bytes("993", "input", "internet", StartTime, EndTime, username);
    	IMAPSSLin = hourly_sum_bytes("585", "input", "internet", StartTime, EndTime, username);
    	DNSin = hourly_sum_bytes("53", "input", "internet", StartTime, EndTime, username);
    	OTHERin = hourly_sum_bytes("other", "input", "internet", StartTime, EndTime, username);
    	ALLin = hourly_sum_bytes("all", "input", "internet", StartTime, EndTime, username);

    	HTTPout = hourly_sum_bytes("80", "output", "internet", StartTime, EndTime, username);
    	HTTPSout = hourly_sum_bytes("443", "output", "internet", StartTime, EndTime, username);
    	SSHout = hourly_sum_bytes("22", "output", "internet", StartTime, EndTime, username);
    	ICQout = hourly_sum_bytes("5190", "output", "internet", StartTime, EndTime, username);
    	SMTPout = hourly_sum_bytes("25", "output", "internet", StartTime, EndTime, username);
    	SSMTPout = hourly_sum_bytes("465", "output", "internet", StartTime, EndTime, username);
    	POP3out = hourly_sum_bytes("110", "output", "internet", StartTime, EndTime, username);
    	POP3Sout = hourly_sum_bytes("995", "output", "internet", StartTime, EndTime, username);
    	IMAPout = hourly_sum_bytes("143", "output", "internet", StartTime, EndTime, username);
      	IMAPSout = hourly_sum_bytes("993", "output", "internet", StartTime, EndTime, username);
    	IMAPSSLout = hourly_sum_bytes("585", "output", "internet", StartTime, EndTime, username);
    	DNSout = hourly_sum_bytes("53", "output", "internet", StartTime, EndTime, username);
    	OTHERout = hourly_sum_bytes("other", "output", "internet", StartTime, EndTime, username);
    	ALLout = hourly_sum_bytes("all", "output", "internet", StartTime, EndTime, username);

    	query = malloc(1024);
    	sprintf(query,
    			"INSERT INTO `hourlystat` ("
					"`id` ,"
					"`timestamp` ,"
					"`owner` ,"
					"`HTTP` ,"
					"`HTTPS` ,"
					"`SSH` ,"
					"`ICQ` ,"
					"`SMTP` ,"
					"`SSMTP` ,"
					"`POP3` ,"
					"`POP3S` ,"
					"`IMAP` ,"
					"`IMAPS` ,"
					"`IMAPSSL` ,"
					"`DNS` ,"
					"`other` ,"
					"`all` ,"
					"`direction` ,"
					"`local` ,"
					"`rotation`"
				") "
				"VALUES ("
					"NULL , %lu, '%s', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', 'input', '0', '1'"
				");",
				timestamp, username, HTTPin, HTTPSin, SSHin, ICQin, SMTPin, SSMTPin, POP3in, POP3Sin, IMAPin, IMAPSin, IMAPSSLin, DNSin, OTHERin, ALLin);

    	exec_query(query);

    	query = malloc(1024);
    	sprintf(query,
    			"INSERT INTO `hourlystat` ("
					"`id` ,"
					"`timestamp` ,"
					"`owner` ,"
					"`HTTP` ,"
					"`HTTPS` ,"
					"`SSH` ,"
					"`ICQ` ,"
					"`SMTP` ,"
					"`SSMTP` ,"
					"`POP3` ,"
					"`POP3S` ,"
					"`IMAP` ,"
					"`IMAPS` ,"
					"`IMAPSSL` ,"
					"`DNS` ,"
					"`other` ,"
					"`all` ,"
					"`direction` ,"
					"`local` ,"
					"`rotation`"
				") "
				"VALUES ("
					"NULL , %lu, '%s', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', 'output', '0', '1'"
				");",
				timestamp, username, HTTPout, HTTPSout, SSHout, ICQout, SMTPout, SSMTPout, POP3out, POP3Sout, IMAPout, IMAPSout, IMAPSSLout, DNSout, OTHERout, ALLout);

    	exec_query(query);

    	//локальный трафик

    	HTTPin = hourly_sum_bytes("80", "input", "local", StartTime, EndTime, username);
    	HTTPSin = hourly_sum_bytes("443", "input", "local", StartTime, EndTime, username);
    	SSHin = hourly_sum_bytes("22", "input", "local", StartTime, EndTime, username);
    	ICQin = hourly_sum_bytes("5190", "input", "local", StartTime, EndTime, username);
    	SMTPin = hourly_sum_bytes("25", "input", "local", StartTime, EndTime, username);
    	SSMTPin = hourly_sum_bytes("465", "input", "local", StartTime, EndTime, username);
    	POP3in = hourly_sum_bytes("110", "input", "local", StartTime, EndTime, username);
    	POP3Sin = hourly_sum_bytes("995", "input", "local", StartTime, EndTime, username);
    	IMAPin = hourly_sum_bytes("143", "input", "local", StartTime, EndTime, username);
      	IMAPSin = hourly_sum_bytes("993", "input", "local", StartTime, EndTime, username);
    	IMAPSSLin = hourly_sum_bytes("585", "input", "local", StartTime, EndTime, username);
    	DNSin = hourly_sum_bytes("53", "input", "local", StartTime, EndTime, username);
    	OTHERin = hourly_sum_bytes("other", "input", "local", StartTime, EndTime, username);
    	ALLin = hourly_sum_bytes("all", "input", "local", StartTime, EndTime, username);

    	HTTPout = hourly_sum_bytes("80", "output", "local", StartTime, EndTime, username);
    	HTTPSout = hourly_sum_bytes("443", "output", "local", StartTime, EndTime, username);
    	SSHout = hourly_sum_bytes("22", "output", "local", StartTime, EndTime, username);
    	ICQout = hourly_sum_bytes("5190", "output", "local", StartTime, EndTime, username);
    	SMTPout = hourly_sum_bytes("25", "output", "local", StartTime, EndTime, username);
    	SSMTPout = hourly_sum_bytes("465", "output", "local", StartTime, EndTime, username);
    	POP3out = hourly_sum_bytes("110", "output", "local", StartTime, EndTime, username);
    	POP3Sout = hourly_sum_bytes("995", "output", "local", StartTime, EndTime, username);
    	IMAPout = hourly_sum_bytes("143", "output", "local", StartTime, EndTime, username);
      	IMAPSout = hourly_sum_bytes("993", "output", "local", StartTime, EndTime, username);
    	IMAPSSLout = hourly_sum_bytes("585", "output", "local", StartTime, EndTime, username);
    	DNSout = hourly_sum_bytes("53", "output", "local", StartTime, EndTime, username);
    	OTHERout = hourly_sum_bytes("other", "output", "local", StartTime, EndTime, username);
    	ALLout = hourly_sum_bytes("all", "output", "local", StartTime, EndTime, username);

    	query = malloc(1024);
    	sprintf(query,
    			"INSERT INTO `hourlystat` ("
					"`id` ,"
					"`timestamp` ,"
					"`owner` ,"
					"`HTTP` ,"
					"`HTTPS` ,"
					"`SSH` ,"
					"`ICQ` ,"
					"`SMTP` ,"
					"`SSMTP` ,"
					"`POP3` ,"
					"`POP3S` ,"
					"`IMAP` ,"
					"`IMAPS` ,"
					"`IMAPSSL` ,"
					"`DNS` ,"
					"`other` ,"
					"`all` ,"
					"`direction` ,"
					"`local` ,"
					"`rotation`"
				") "
				"VALUES ("
					"NULL , %lu, '%s', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', 'input', '1', '1'"
				");",
				timestamp, username, HTTPin, HTTPSin, SSHin, ICQin, SMTPin, SSMTPin, POP3in, POP3Sin, IMAPin, IMAPSin, IMAPSSLin, DNSin, OTHERin, ALLin);

    	exec_query(query);

    	query = malloc(1024);
    	sprintf(query,
    			"INSERT INTO `hourlystat` ("
					"`id` ,"
					"`timestamp` ,"
					"`owner` ,"
					"`HTTP` ,"
					"`HTTPS` ,"
					"`SSH` ,"
					"`ICQ` ,"
					"`SMTP` ,"
					"`SSMTP` ,"
					"`POP3` ,"
					"`POP3S` ,"
					"`IMAP` ,"
					"`IMAPS` ,"
					"`IMAPSSL` ,"
					"`DNS` ,"
					"`other` ,"
					"`all` ,"
					"`direction` ,"
					"`local` ,"
					"`rotation`"
				") "
				"VALUES ("
					"NULL , %lu, '%s', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', '%llu', 'output', '1', '1'"
				");",
				timestamp, username, HTTPout, HTTPSout, SSHout, ICQout, SMTPout, SSMTPout, POP3out, POP3Sout, IMAPout, IMAPSout, IMAPSSLout, DNSout, OTHERout, ALLout);

    	exec_query(query);


    	//удаляем обработанные записи
   		query = malloc(512);
   		sprintf(query, "DELETE FROM `flows` WHERE `owner` = '%s' AND `TimeStamp` > %lu AND `TimeStamp` < %lu", username, StartTime, EndTime);
   		exec_query(query);

    	//чистим память
    	free(username);
    }

	//удаляем потоки старши трех месяцев (90 дней)
	if ( 0 == strcmp(vpnms_config.vpnms_keep_flows, "yes") )
	{
		DelDate = (unsigned long)time(NULL) - (3*30*24*60*60);

		query = malloc(512);
		sprintf(query, "DELETE FROM `flows_archive` WHERE `TimeStamp` < %lu", DelDate);
		exec_query(query);
	}

	//удаляем лок-файл
	lockf(lockfd, F_ULOCK, 0);
	close(lockfd);
	unlink(HSTLOCKF);

	return 0;
}
