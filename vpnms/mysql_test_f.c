#include "mysql_test.h"

void exec_query(char *query, MYSQL_RES *res)
{
	MYSQL 		mysql;

	mysql_init(&mysql);
	if (!mysql_real_connect(&mysql, "10.0.15.5", "root", "",	"radius", 3306, NULL, 0))
	{
		printf ("Failed to connect to database: Error: %s\n", mysql_error(&mysql));
		exit(EXIT_FAILURE);
	}

    if ( mysql_real_query(&mysql, query, strlen(query)) )
    {
		printf ("Query failed: Error: %s\n", mysql_error(&mysql));
		exit(EXIT_FAILURE);
	}
    free(query);

    res = mysql_store_result(&mysql);

    mysql_close(&mysql);
}
