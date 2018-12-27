/*
 * etcp.c
 *
 *  Created on: 19.08.2009
 *      Author: metallic
 */

static void set_address( char *hname, char *sname, struct sockaddr_in *sap, char *protocol)
{
	struct servent *sp;
	struct hostent *hp;
	char *endptr;
	short port;

	bzero(sap, sizeof(*sap));
	sap->sin_family = AF_INET;
	if (hname != NULL)
	{
		if (!inet_aton(hname, &sap->sin_addr))
		{
			hp = gethostbyname(hname);
			if (hp == NULL)
				error(1, 0, "unknown host: %s\n", hname);
		}
	}
	else
		sap->sin_addr.s_addr = htonl(INADDR_ANY);
	port = strtol(sname, &endptr, 0);
	if (*endptr == '\0')
		sap->sin_port = htons(port);
	else
	{
		sp = getservbyname(sname, protocol);
		if (sp == NULL)
			error(1, 0, "bad service: %s\n", sname);
		sap->sin_port = sp->s_port;
	}
}

void error(int status, int err, char *fmt, ...)
{
	va_list ap;
	va_start( ap, fmt);
//	fprint(stderr, "%s: ", program_name);
	vfprintf(stderr, fmt, ap);
	va_end(ap);
	if (err)
		printf(stderr, ": %s (%d)\n", strerror(err), err);
	if (status)
		EXIT(status);
}

static void server (SOCKET s, struct sockaddr_in *peerp)
{
	send(s, "test msg\n", 9, 0);

}
/*
SOCKET tcp_server(char *host, char *port)
{
	struct sockaddr_in local;
	SOCKET s;
	const int on = 1;

	set_address(hname, sname, &l	ocal, "tcp");
	s = socket(AF_INET, SOCK_STREAM, 0);
	if (!isvalidsock(s))
		error(1, errno, "error in call socket()");

	if (setsockopt(s, SOL_SOCKET, SO_REUSEADDR, &on, sizeof(on)))
		error (1, errno, "error in call setsockopt");

	if (bind(s, (struct sockaddr *) &local, sizeof(local)))
		error(1, errno, "error in call bind()");

	if (listen(s, NLISTEN))
		error(1, errno, "error in call listen()");

	return s;
}

*/


static void client (SOCKET s, struct sockaddr_in *peerp)
{
	int rc;
	char buf[120];

	for (;;)
	{
		rc = recv(s, buf, sizeof(buf), 0);
		if (rc <= 0)
			break;
		write(1, buf, rc);
	}

}

static void udpserver (SOCKET s, struct sockaddr_in *localp)
{
	struct sockaddr_in peer;
	int peerlen, rc;
	char buf[120];

	for (;;)
	{
		peerlen = sizeof(peer);
		if (rc = recvfrom(s, buf, sizeof(buf), 0, (struct sockaddr *)&peer, &peerlen) < 0)
			error(1, errno, "error in call recvfrom");
		write(1, buf, rc);
		/*
		if (sendto(s, "test msg from server \n", 23, 0, (struct sockaddr *)&peer, &peerlen) < 0)
			error(1, errno, "error in call sendto");
			*/
	}
}

static void udpclient (SOCKET s, struct sockaddr_in *peerp)
{
	int rc, peerlen;
	char buf[120];

	peerlen = sizeof(*peerp);
	if (sendto(s, "client", 6, 0, (struct sockaddr *)peerp, peerlen) < 0)
		error(1, errno, "error in call sendto");
	rc = recvfrom(s, buf, sizeof(buf), 0, (struct sockaddr *)peerp, &peerlen);
	if (rc >= 0)
		write(1, buf, rc);
	else
		error(1, errno, "error in call recvfrom");

}
