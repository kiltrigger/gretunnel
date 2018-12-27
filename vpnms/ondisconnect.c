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

/*
 *  Command line arguments:
 *  argv[1] - username
 */

#include "vpnms.h"

int main (int argc, char **argv)
{
	char 		*username;
	char 		*query;
	MYSQL_RES	*res;
	MYSQL_ROW	row;
	int			rows = 0;
	char		*StartTime;
	unsigned long int	SessionTime;
	unsigned long int	StopTime;
	struct s_balance	balance;

	//если переданы не все параметры - выйти
	if (argc < 2)
	{
		syslog (LOG_ERR, " missing argument");
        exit(EXIT_FAILURE);
	}

	username = argv[1];

    //loading config
    vpnms_config = LoadConfig();

    //Закрываем сессию
	query = malloc(256);
	sprintf(query, "SELECT sessions.StartTime FROM `sessions` WHERE `UserName` = '%s' AND `Connected` = '1'", username);
	res = exec_query(query);
	rows = mysql_num_rows(res);
	row = mysql_fetch_row(res);
	if (rows != 0)
		StartTime = strdup(row[0]);
	mysql_free_result(res);

	//если есть открытая сессия, то закрываем
	if (rows > 0)
	{
		StopTime = (unsigned long)time(NULL);
		SessionTime = StopTime - atoll(StartTime);

		query = malloc(512);
		sprintf(query, "UPDATE `sessions` SET `SessionTime` = '%lu' ,`Connected` = '0', `StopTime` = '%lu'  WHERE `UserName` = '%s' AND `Connected` = '1'",
				SessionTime, StopTime, username);
		exec_query(query);
		free(StartTime);
	}

	//Удаляем правила
	clear_rules(username);

	//проверяем баланс пользователя, если превышен - меняем статус
	balance = check_balance(username);

	if ( strcasecmp(check_status(username), STATUS_WORKING) == 0)
		if (strcasecmp(balance.limit_type, LIMIT_TYPE_LIMITED) == 0 )
		{
			if ( (balance.input >= balance.limit) || (balance.output >= balance.out_limit) )
			{
				query = malloc(256);
				sprintf(query, "UPDATE `radcheck` SET `status` = '%s' WHERE `UserName` = '%s'", STATUS_LIMIT_EXPIRE, username);
				exec_query(query);
			}
		}
		free(balance.limit_type);

		return 0;
}
