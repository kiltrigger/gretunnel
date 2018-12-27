/*
 * ip.c
 *
 *  Created on: 21.09.2009
 *      Author: BURUT\admin
 */

#include <stdio.h>

int is_it_vpn (char *ip, char *mask, char *net)
{
	if ( (inet_addr(ip) & inet_addr(mask)) == inet_addr(net) )
		return 1;

	return 0;
}

int main ()
{
	char *ip, *mask, *net;

	ip = "10.1.2.5";
	mask = "255.255.255.0";
	net = "10.1.1.0";

	printf("ip: %d, mask: %d, net: %d, code: %d\n", inet_addr(ip), inet_addr(mask), inet_addr(net), inet_addr(ip) & inet_addr(mask) );

	if (is_it_vpn(ip, mask, net) == 1) printf("OK\n");

	return 0;
}
