/*
 * tcpserver.skel.c
 *
 *  Created on: 18.08.2009
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

#define NLISTEN 5

char *program_name;

int main ( int argc, char **argv)
{
	struct sockaddr_in local;
	struct sockaddr_in peer;
	char *hname;
	char *sname;
	int peerlen;
	SOCKET s1;
	SOCKET s;
	const int on = 1;

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

	set_address(hname, sname, &local, "tcp");
	s = socket(AF_INET, SOCK_STREAM, 0);
	if (!isvalidsock(s))
		error(1, errno, "error in call socket()");

	if (setsockopt(s, SOL_SOCKET, SO_REUSEADDR, &on, sizeof(on)))
		error (1, errno, "error in call setsockopt");

	if (bind(s, (struct sockaddr *) &local, sizeof(local)))
		error(1, errno, "error in call bind()");

	if (listen(s, NLISTEN))
		error(1, errno, "error in call listen()");

	do
	{
		peerlen = sizeof(peer);
		s1 = accept(s, (struct sockadr *)&peer, &peerlen);
		if (!isvalidsock(s1))
			error(1, errno, "error in call accept()");
		server(s1, &peer);
		CLOSE(1);
	} while(1);

	EXIT(0);
}
