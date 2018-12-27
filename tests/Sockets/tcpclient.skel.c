/*
 * tcpclient.skel.c
 *
 *  Created on: 27.08.2009
 *      Author: metallic
 */

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <stdarg.h>
#include <string.h>
#include <errno.h>
#include <netdb.h>
#include <fcntl.h>
#include <sys/time.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include "skel.h"
#include "etcp.c"

char *program_name;

int main ( int argc, char **argv)
{
	struct sockaddr_in peer;
	SOCKET s;

	INIT();

	set_address(argv[1], argv[2], &peer, "tcp");
	s = socket(AF_INET, SOCK_STREAM, 0);
	if (!isvalidsock(s))
		error(1, errno, "error in call socket()");

	if (connect(s, (struct sockaddr *)&peer, sizeof(peer)))
		error (1, errno, "error in call connect");

	client(s, &peer);

	EXIT(0);
}
