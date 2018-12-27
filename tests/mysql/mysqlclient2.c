/*
 * mysqlclient2.c
 *
 *  Created on: 23.09.2009
 *      Author: BURUT\admin
 */

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
#include <signal.h>
#include <mysql/mysql.h>

int main (void)
{
	char host[] = "10.0.15.5";
	char user[] = "vpnms";
	char pass[] = "pass";
	char db[] = "radius";
	unsigned int port = 3306;
	int rows, i;

	MYSQL mysql;
	MYSQL_RES *res;
	MYSQL_ROW row;
	char *query = "SELECT Subnet_Address, NetMask FROM `subnets`";

	mysql_init(&mysql);
	if (!mysql_real_connect(&mysql, host, user, pass, db, port, NULL, 0))
		fprintf(stderr, "Failed to connect to database: Error: %s\n", mysql_error(&mysql));

	if ( mysql_real_query(&mysql, query, strlen(query)) )
		fprintf(stderr, "Query failed: Error: %s\n", mysql_error(&mysql));

	res = mysql_store_result(&mysql);

	rows = mysql_num_rows(res);

	while ((row = mysql_fetch_row(res)))
	{
		printf("%s %u\n", row[0], inet_addr(row[0]));
	}


/*
	unsigned int num_fields = mysql_num_fields(res);
	while ((row = mysql_fetch_row(res)))
	{
		unsigned long *lengths;
		lengths = mysql_fetch_lengths(res);
		for(i = 0; i < num_fields; i++)
		{
			printf("[%.*s] ", (int) lengths[i], row[i] ? row[i] : "NULL");
		}
		printf("\n");
	}
*/


	mysql_close(&mysql);

	return 0;
}

