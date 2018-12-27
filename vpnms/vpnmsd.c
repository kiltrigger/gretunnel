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

void SigHandler()
{
	extern short received_kill_sig;
	received_kill_sig = 1;
}

void * vpnmsd_nf_thread(void * arg);

#define NF_BUFLEN 2048

int ShowConfig()
{
	vpnms_config = LoadConfig();
	printf("\n[mysql]\nhost = %s\nusername = %s\npassword = %s\ndatabase = %s\nport = %u\n\n[vpnms]\nclose_console = %s\ndaemon_interval = %u\n"
			"network = %s\nnetmask = %s\naltq = %s\ntransparent_proxy = %s\ntransparent_proxy_port = %u\nhourly_stat = %s\nsql_debug = %s\n"
			"cmd_debug = %s\npf_file_debug = %s\ndisconnect_on_crash = %s\nkeep_flows = %s\n\n[vars]\npfctl = %s\necho = %s\nond = %s\nmpd_rc_script = %s\n\n",
			vpnms_config.mysql_host, vpnms_config.mysql_username, vpnms_config.mysql_password, vpnms_config.mysql_database, vpnms_config.mysql_port,
			vpnms_config.vpnms_close_console, vpnms_config.vpnms_daemon_interval, vpnms_config.vpnms_network, vpnms_config.vpnms_netmask, vpnms_config.vpnms_altq,
			vpnms_config.vpnms_transparent_proxy, vpnms_config.vpnms_transparent_proxy_port, vpnms_config.vpnms_hourly_stat, vpnms_config.vpnms_sql_debug,
			vpnms_config.vpnms_cmd_debug, vpnms_config.vpnms_pf_file_debug, vpnms_config.vpnms_disconnect_on_crash, vpnms_config.vpnms_keep_flows,
			vpnms_config.vars_pfctl, vpnms_config.vars_echo, vpnms_config.vars_ond, vpnms_config.vars_mpd_rc_script);

	return 0;
}

//struct s_vpnms_config	vpnms_config;
struct s_subnets		*subnets;
size_t					num_subnets = 0;
int						nf_thread_initialized = 0;
MYSQL 					mysql;

int main(int argc, char **argv)
{
        static int 			opt, pidfd;
        pid_t 					pid, sid;
        char 					chpid[6];
        struct sigaction		act;
    	MYSQL_RES 				*res;
    	MYSQL_ROW 				row;
    	size_t					rows;
    	char 					*query;
    	pthread_t				nf_thread;
    	struct s_balance		balance;
    	myint					SessId;
    	myint					summ_in;
    	myint					summ_out;
    	myint					summ_loc_in;
    	myint					summ_loc_out;
    	unsigned long int		cur_uts;
    	unsigned long int		SpeedIn;
    	unsigned long int		SpeedOut;
    	char					*cmd;
    	char					*pUsername;
    	char					*pStatus;

        char help_str[] =
        		"Usage: vpnmsd [OPTION]\n"
        		"without options start the daemon.\n"
        		"-s, --stop	to stop the daemon.\n"
        		"-v, --version	to show version.\n"
        		"-c, --showconfig to show config.\n"
        		"-h, --help	to show help.\n";

        const struct option opts[] = {
        		{"stop", no_argument, NULL, 's'},
        		{"version", no_argument, NULL, 'v'},
        		{"showconfig", no_argument, NULL, 'c'},
        		{"help", no_argument, NULL, 'h'},
        		{NULL, 0, NULL, 0}
        };

        while ((opt = getopt_long(argc, argv, "svch:", opts, NULL)) != -1) {
                switch (opt) {
                case 'h':
						printf("%s", help_str);
						exit(EXIT_SUCCESS);

                case 'v':
						printf("VPNMS version %s revision %s\nAuthor: Andrey Chebotarev\nMail: admin@vpnms.org\nVPNMS 2005-2010\n", VERSION, REVISION);
						exit(EXIT_SUCCESS);

                case 's':
						KillDaemon();
						exit(EXIT_SUCCESS);

                case 'c':
						ShowConfig();
						exit(EXIT_SUCCESS);

//                default:
//						break;
                }
        }

//        if (argc < 2)
//        	printf("%s", help_str);

        //check vpnmsd
        if ( check_daemon() == 1)
        {
			syslog (LOG_ERR, " daemon already running");
            exit(EXIT_FAILURE);
        }

        //Demonize vpnmsd
        pid = fork();

        if (pid < 0) {
        	syslog (LOG_ERR, " error in fork()");
            exit(EXIT_FAILURE);
        } else if (pid > 0) {
            exit(EXIT_SUCCESS);
        }

        umask(0);

        sid = setsid();

        if (sid < 0) {
        	syslog (LOG_ERR, " error in setsid()");
            exit(EXIT_FAILURE);
        }

        if ((chdir("/")) < 0) {
			syslog (LOG_ERR, " error in chdir()");
            exit(EXIT_FAILURE);
        }

        //signals
        sigemptyset(&act.sa_mask);
        act.sa_handler = &SigHandler;
        act.sa_flags = 0;

        if ( sigaction (SIGTERM, &act, NULL) == -1 )
        {
        	syslog (LOG_ERR, " sigaction error");
        	exit(EXIT_FAILURE);
        }

        //loading config
        vpnms_config = LoadConfig();

        //closing stdin, stdout and stderr
        if ( strcasecmp (vpnms_config.vpnms_close_console, "yes") == 0 )
        {
        	close(0);
            close(1);
            close(2);
        }

        //reading local subnets...
        query = malloc(256);
        sprintf(query, "SELECT Subnet_Address, NetMask FROM `subnets`");

        res = exec_query(query);
        rows = mysql_num_rows(res);
        subnets = calloc(rows + 1, sizeof(struct s_subnets));

        while ((row = mysql_fetch_row(res)))
        {
        	num_subnets++;
        	subnets[num_subnets].address = inet_addr(row[0]);
        	subnets[num_subnets].mask = inet_addr(row[1]);
        }
        mysql_free_result(res);

        //creating netflow thread...
        if (pthread_create(&nf_thread, NULL, &vpnmsd_nf_thread, NULL) != 0)
        {
    		syslog (LOG_ERR, "Erron in create nf_thread\n");
    		exit(EXIT_FAILURE);
        }

        //writing pid
        pidfd = open (PIDFILE, O_WRONLY | O_CREAT, 0640);
        if (pidfd == -1)
        {
        	syslog (LOG_ERR, " error in open %s", PIDFILE);
        	exit(EXIT_FAILURE);
        }

        if ( lockf(pidfd, F_TLOCK, 0) < 0)
        {
        	syslog (LOG_ERR, " error in lock %s", PIDFILE);
        	exit(EXIT_FAILURE);
        }

        ftruncate(pidfd, 0);
        sprintf( chpid, "%d", sid );
        if ( write(pidfd, chpid, strlen(chpid) ) == -1 )
        {
        	syslog (LOG_ERR, " error in writing to %s", PIDFILE);
        	exit(EXIT_FAILURE);
        }

        //vpnmsd demonized and configured, writing to log
        syslog (LOG_NOTICE, " started");

        //waiting nf_thread...
        //while(nf_thread_initialized == 0)
        	//sleep(1);

       /***************************************************************************************************************************************************
        starting work...
        ***************************************************************************************************************************************************/

        //daemon cycle...
    	while (1)
        {
    		sleep(vpnms_config.vpnms_daemon_interval);

            //обновляем время сессии
  	        query = malloc(128);
  	        sprintf(query, "UPDATE sessions SET  "
							"`SessionTime` = UNIX_TIMESTAMP( ) - sessions.StartTime, "
							"`StopTime` = UNIX_TIMESTAMP( ) "
							"WHERE Connected = 1");
			exec_query_write(query);

            //обнуляем скорость
  			query = malloc(256);
  	        sprintf(query, "UPDATE `sessions` SET `Speed_in` = 0, `Speed_out` = 0 WHERE `Connected` = 1");
  	        exec_query_write(query);

  	        cur_uts = (unsigned long)time(NULL);

  	        /*
  	         *  Берем первый попавшийся поток. Если потоков нет - выходим, если есть -
  	         *  продолжаем. Смотрим чей поток. Вычисляем последнюю сессию пользователя,
  	         *  если существует, суммируем трафик по потокам, которые были записаны
  	         *  раньше текущего времени, вычисляем нагрузку на канал и после записываем данные
  	         *  в сессию. Дальше проверяем исчерпавших лимит, а затем удаляем обработанные
  	         *  потоки.
  	         */

  	        while (1)
  	        {
      			summ_in = 0;
      			summ_out = 0;
      			summ_loc_in = 0;
      			summ_loc_out = 0;

  	        	//выбираем первую попавшуюся запись из временной таблицы
  	        	query = malloc(512);
  	        	sprintf(query, "SELECT Owner FROM `flows_tmp` WHERE TimeStamp < '%lu' ORDER BY TimeStamp LIMIT 1", cur_uts);
  	        	res = exec_query(query);

  	        	//если потоки кончились - выходим из цикла
  	        	if (mysql_num_rows(res) < 1)
  	        	{
  	        		mysql_free_result(res);
  	        		break;
  	        	}

  	        	row = mysql_fetch_row(res);
  	        	pUsername = strdup(row[0]);
  	        	mysql_free_result(res);

  	        	/*
  	        	 * Смотрим последнюю сессию, если ее еще нет - значит еще не успел создасться. Тогда пропускаем этого пользователя
  	        	 *  т.к. без добавления правил в цепочку VPNMS все равно трафик не пойдет.
  	        	 */

  	        	SessId = get_sess_id(pUsername);
  	        	if (SessId != -1)
  	        	{

  	        		query = malloc(2048);
  	        		sprintf(query,"SELECT "
									"(SELECT SUM(Bytes) FROM `flows_tmp` WHERE DstIP LIKE '10.%%.%%.%%' AND Local = 0 AND Owner = '%s' AND TimeStamp < %lu) AS sumin, "
									"(SELECT SUM(Bytes) FROM `flows_tmp` WHERE SrcIP LIKE '10.%%.%%.%%' AND Local = 0 AND Owner = '%s' AND TimeStamp < %lu) AS sumout, "
									"(SELECT SUM(Bytes) FROM `flows_tmp` WHERE DstIP LIKE '10.%%.%%.%%' AND Local = 1 AND Owner = '%s' AND TimeStamp < %lu) AS sumlocin, "
									"(SELECT SUM(Bytes) FROM `flows_tmp` WHERE SrcIP LIKE '10.%%.%%.%%' AND Local = 1 AND Owner = '%s' AND TimeStamp < %lu) AS sumlocout",
									pUsername, cur_uts, pUsername, cur_uts, pUsername, cur_uts, pUsername, cur_uts);


  	        		res = exec_query(query);

  	        		if ( mysql_num_rows(res) < 1 )
  	        		{
  	        			mysql_free_result(res);
  	        			syslog (LOG_ERR, " error in select SUM. Username: %s", pUsername);
  	        		}

  	        		else
  	        		{
  	        			row = mysql_fetch_row(res);
  	        			if ( row[0] != NULL )
  	        				summ_in = atoll(row[0]);
  	        			if ( row[1] != NULL )
  	        				summ_out = atoll(row[1]);
  	        			if ( row[2] != NULL )
  	        				summ_loc_in = atoll(row[2]);
  	        			if ( row[3] != NULL )
  	        				summ_loc_out = atoll(row[3]);

  	        			mysql_free_result(res);
  	        		}

  	        		SpeedIn = (summ_in + summ_loc_in)/vpnms_config.vpnms_daemon_interval;
  	        		SpeedOut = (summ_out + summ_loc_out)/vpnms_config.vpnms_daemon_interval;

          	        // Записываем в сессию данные о трафике, времени сессии, скорость
          			query = malloc(1024);
          	        sprintf(query,
          	        		"UPDATE `sessions` SET "
          	        		"`InternetIn` = InternetIn + %llu, "
          	        		"`InternetOut` = InternetOut + %llu, "
          	        		"`LocalIn` = LocalIn + %llu,"
          	        		"`LocalOut` = LocalOut + %llu, "
          	        		"`Speed_in` = %lu, "
          	        		"`Speed_out` = %lu "
          	        		"WHERE `SessId` = %llu LIMIT 1",
          	        		summ_in, summ_out, summ_loc_in, summ_loc_out,
          	        		SpeedIn, SpeedOut, SessId);
          	        exec_query_write(query);

          	        // Проверяем баланс пользователя, если все прокачал - отключаем
                 	pStatus = check_status(pUsername);
          	        balance = check_balance(pUsername);

          	        if ( strcasecmp(pStatus, STATUS_WORKING) == 0)
          	        	if (strcasecmp(balance.limit_type, LIMIT_TYPE_LIMITED) == 0 )
          	        		if ( (balance.input >= balance.limit) || (balance.output >= balance.out_limit) )
          	        		{
								#ifdef DEBUG
          	        			syslog (LOG_DEBUG, " limit expired: %s", pUsername);
								#endif
          	        			cmd = malloc(256);
          	        			sprintf(cmd, "%s %s", vpnms_config.vars_ond, pUsername);
          	        			exec_cmd(cmd);
          	        		}

					free(balance.limit_type);
					free(pStatus);
				}

  	        	//Удаляем обработанные потоки
  	        	query = malloc(512);
  	        	sprintf(query, "DELETE FROM `flows_tmp` WHERE `Owner` = '%s' AND `TimeStamp` < %lu", pUsername, cur_uts);
  	        	exec_query_write(query);

  	        	free(pUsername);
  	        }

          	if ( received_kill_sig == 1 ) StopDaemon();
        }

        //*************************************************************************************************************************************************

    	exit(EXIT_SUCCESS);
}

