/*
 * udpserver.skel.c
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
	struct sockaddr_in local;
	char *hname;
	char *sname;
	int peerlen;
	SOCKET s;

	INIT();

	if (argc == 2)
	{
		hname = NULL;
		sname = argv[1];
	}
	else
	{
		hname = argv[1];
		sname = argv[2];
	}

	set_address(hname, sname, &local, "udp");
	s = socket(AF_INET, SOCK_DGRAM, 0);
	if (!isvalidsock(s))
		error(1, errno, "error in call socket()");

	if (bind(s, (struct sockaddr *) &local, sizeof(local)))
		error(1, errno, "error in call bind()");

	udpserver(s, &local);

	EXIT(0);
}
