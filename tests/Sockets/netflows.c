#include <stdio.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <stdlib.h>
#include <netinet/in.h>
#include "skel.h"

#define QUEUE_LENGTH	10
#define BUF_LEN		256

int main (void)
{
	int sock;
	struct sockaddr_in saddr;
	char * buf;
	int count;

	buf = (char *) malloc (BUF_LEN);
	if (buf == NULL) {
		fprintf (stderr, "malloc() error\n");
		return 1;
	}

	saddr.sin_family = AF_INET;
	saddr.sin_port = htons( 7500 );
	saddr.sin_addr.s_addr = htonl ( INADDR_ANY );

	sock = socket (AF_INET, SOCK_DGRAM, 0);
	if (sock == -1) {
		fprintf (stderr, "socket() error\n");
		return 1;
	}

	if (bind( sock, ( struct sockaddr * )&saddr, sizeof (&saddr) ) == -1) {
		fprintf (stderr, "bind() error\n");
		return 1;
	}
/*
	while (1) {
		if ((count = recvfrom (sock, buf, BUF_LEN-1,
			0, NULL, NULL)) == -1) 
		
		{
			fprintf (stderr, "recvfrom() error\n");
			return 1;
		}

		buf[count] = '\0';
		printf (">> %s\n", buf);

		if (!strcmp (buf, "exit")) break;
	}
*/

	free (buf);
	close (sock);
	return 0;
}
