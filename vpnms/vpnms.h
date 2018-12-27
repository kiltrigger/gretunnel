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

#ifndef VPNMS_H_
#define VPNMS_H_

#include <getopt.h>
#include <stdio.h>
#include <fcntl.h>
#include <stdlib.h>
#include <syslog.h>
#include <unistd.h>
#include <string.h>
#include <arpa/inet.h>
#include <netinet/in.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <sys/shm.h>
#include <signal.h>
#include <pthread.h>
#include <time.h>
#include "/usr/local/include/mysql/mysql.h"
#include "config.h"
#include "vpnms_functions.h"

#define VERSION "1.0.0 "
#define REVISION "55"
#define PIDFILE "/var/run/vpnmsd.pid"
#define CONFIGFILE "/usr/local/etc/vpnms.conf"
#define HSTLOCKF "/tmp/hourlystat.lock"

//PF config
#define PF_VPNMS_ANCHOR "vpnms"
#define PF_VPNMSP_ANCHOR "vpnmsp"

//status config
#define STATUS_BLOKED "blocked"
#define STATUS_WORKING "working"
#define STATUS_LIMIT_EXPIRE "limit_expire"
#define STATUS_LOCAL_ONLY "local_only"

#define LIMIT_TYPE_LIMITED "limited"
#define LIMIT_TYPE_UNLIMITED "unlimited"

extern short received_kill_sig;

struct s_vpnms_config
{
	char	*mysql_host;
	char	*mysql_username;
	char	*mysql_password;
	char	*mysql_database;
	int		mysql_port;

	char	*vpnms_close_console;
	int		vpnms_daemon_interval;
	char	*vpnms_network;
	char	*vpnms_netmask;
	char	*vpnms_altq;
	char	*vpnms_transparent_proxy;
	char	*vpnms_sql_debug;
	char	*vpnms_cmd_debug;
	char	*vpnms_pf_file_debug;
	char	*vpnms_hourly_stat;
	char	*vpnms_disconnect_on_crash;
	char	*vpnms_keep_flows;
	unsigned int vpnms_transparent_proxy_port;

	char	*vars_pfctl;
	char	*vars_echo;
	char	*vars_ond;
	char	*vars_mpd_rc_script;
};

#define NF_BUFLEN 2048
#define NF_PORT 9999

typedef unsigned long long int myint;

struct s_balance {
	char	*limit_type;
	myint	limit;
	myint	out_limit;
	myint	input;
	myint	output;
	myint	local_input;
	myint	local_output;
};

extern struct s_vpnms_config	vpnms_config;
struct s_vpnms_config	vpnms_config;

struct s_subnets {
	in_addr_t address;
	in_addr_t mask;
};

extern struct s_subnets *subnets;
extern size_t num_subnets;
extern pthread_mutex_t	mutex;
extern int nf_thread_initialized;
extern int waiting_mutex;
//extern MYSQL mysql;
unsigned long int timestamp;

int is_it_local (char *ip);
int is_it_vpn (char *ip, char *mask, char *net);

#endif /* VPNMS_H_ */
