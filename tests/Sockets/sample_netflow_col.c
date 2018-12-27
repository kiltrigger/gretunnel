#include <arpa/inet.h>
#include <netinet/in.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <unistd.h>
#include "netflow.h"

#define BUFLEN 4096
#define PORT 9999

void diep(char *s)
{
    perror(s);
    exit(1);
}

int main(void)
{
    struct sockaddr_in si_me;
    struct in_addr ip;
    struct netflow_v5_export_dgram * pData;
    int s, i, cnt;
    char buf[BUFLEN];
    char src_ip[17], dst_ip[17];

    if ((s=socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP))==-1)
      diep("socket");

    memset((char *) &si_me, 0, sizeof(si_me));

    si_me.sin_family = AF_INET;
    si_me.sin_port = htons(PORT);
    si_me.sin_addr.s_addr = htonl(INADDR_ANY);

    if (bind(s, &si_me, sizeof(si_me))==-1) diep("bind");

    for (;;)
    {
      if ( recvfrom(s, buf, BUFLEN, 0, 0, 0) == -1 ) diep("error in recvfrom()");
      pData = &buf;

      cnt = ntohs (pData->header.count);
      printf("count: %d \n", cnt);

      for (i=0; i < cnt; i++)
      {
          ip.s_addr  = pData->r[i].src_addr;
          strcpy( src_ip, inet_ntoa( ip ) );
          ip.s_addr  = pData->r[i].dst_addr;
          strcpy( dst_ip, inet_ntoa( ip ) );

          printf("№%d %s:%d -> %s:%d  %d bytes\n", i, src_ip, ntohs (pData->r[i].s_port ), dst_ip,  ntohs (pData->r[i].d_port ), ntohl (pData->r[i].octets ));
      }

      printf("\n");
    }

    close(s);
    return 0;
}


