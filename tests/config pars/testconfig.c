/*
 * testconfig.c
 *
 *  Created on: 28.08.2009
 *      Author: metallic
 */

#include <string.h>
#include <stdio.h>
#include "config.h"

int main (void)
{
	config_context_t *config_f;
	char *host, *username, *password;

	config_f = config_open("config.cfg");
	host = config_get_string (config_f, "mysql", "host");
	username = config_get_string (config_f, "mysql", "username");
	password = config_get_string (config_f, "mysql", "password");

	printf("host: %s\nusername: %s\npassword: %s\n", host, username, password);

	config_close(config_f);
	return 0;
}
