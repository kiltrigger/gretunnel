#include "/usr/include/mysql/mysql.h"
#include <stdio.h>
#include <stdlib.h>

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
    printf("func res: (%p)\n", res);

    mysql_close(&mysql);
}

int main()
{
	MYSQL_RES	*res;
	MYSQL_ROW	row;
	char		*query;
	int			i;

		query = malloc(512);
		sprintf(query, "SELECT * FROM `radcheck`");

		res = malloc(sizeof(MYSQL_RES)+1);

		printf("do func res: (%p)\n", res);

		exec_query(query, res);

		printf("prog res: (%p)\n", res);

/*
		while ((row = mysql_fetch_row(res)))
		{
			printf("username: %s\n", row[1]);
		}
*/
		mysql_free_result(res);
}
