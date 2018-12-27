/*
 * etcp.h
 *
 *  Created on: 19.08.2009
 *      Author: metallic
 */

#ifndef ETCP_H_
#define ETCP_H_

void set_address (char *host, char *port, struct sockaddr_in *sap, char *protocol);

void error(int status, int err, char *format, ...);

SOCKET tcp_server(char *host, char *port);


#endif /* ETCP_H_ */
