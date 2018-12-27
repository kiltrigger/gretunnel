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

#ifndef VPNMS_FUNCTIONS_H_
#define VPNMS_FUNCTIONS_H_

void StopDaemon();
void KillDaemon ();
struct s_vpnms_config LoadConfig();
int check_daemon();
char *username_by_ip(char *ip);
char *check_status(char *username);
long long int get_sess_id(char *username);
struct s_balance check_balance(char *username);
MYSQL_RES *exec_query(char *query);
void exec_query_write(char *query);
int exec_cmd(char *cmd);
int clear_rules(char *username);
char *ip_by_username(char *username);
int add_rules(char *username, char *if_name);

#endif /* VPNMS_FUNCTIONS_H_ */
