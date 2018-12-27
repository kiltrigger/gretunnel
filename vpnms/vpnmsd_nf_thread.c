/*
 *   VPN Management System
 *   Copyright (C) 2005-2010  Andrey Chebotarev <admin@vpnms.org>
 *   All rights reserved.
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

#include "vpnms.h"
#include "netflow.h"

int is_it_local (char *ip)
{
    int sbnts;
    for (sbnts = 1; sbnts <= num_subnets; sbnts++)
    	if ( (inet_addr(ip) & subnets[sbnts].mask) == subnets[sbnts].address )
    		return 1;

    return 0;
}

int is_it_vpn (char *ip, char *mask, char *net)
{
	if ( (inet_addr(ip) & inet_addr(mask)) == inet_addr(net) )
		return 1;

	return 0;
}

void * vpnmsd_nf_thread(void * arg)
{
    struct sockaddr_in si_me;
    struct in_addr ip;
    struct netflow_v5_export_dgram * pData;
    int s, i, cnt;
    char buf[NF_BUFLEN];
    char src_ip[17], dst_ip[17];
    char *query;
    int local_flow;
    char *pUsername;

    if ((s=socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP))==-1)
    {
        syslog (LOG_ERR, " faild to create socket");
        StopDaemon();
    }

    memset((char *) &si_me, 0, sizeof(si_me));

    si_me.sin_family = AF_INET;
    si_me.sin_port = htons(NF_PORT);
    si_me.sin_addr.s_addr = htonl(INADDR_ANY);

    if (bind(s, &si_me, sizeof(si_me))==-1)
    {
        syslog (LOG_ERR, " faild to bind socket");
        StopDaemon();
    }

    nf_thread_initialized = 1;

    while (1)
    {
        if ( recvfrom(s, buf, NF_BUFLEN, 0, 0, 0) == -1 )
        {
            syslog (LOG_ERR, " unable to obtain data");
            StopDaemon();
        }
        pData = &buf;

        cnt = ntohs (pData->header.count);

        for (i=0; i < cnt; i++)
        {
            ip.s_addr  = pData->r[i].src_addr;
            strcpy( src_ip, inet_ntoa( ip ) );
            ip.s_addr  = pData->r[i].dst_addr;
            strcpy( dst_ip, inet_ntoa( ip ) );

            //printf("№%d %s:%d -> %s:%d  %d bytes\n", i, src_ip, ntohs (pData->r[i].s_port ), dst_ip,  ntohs (pData->r[i].d_port ), ntohl (pData->r[i].octets ));

            if ( (is_it_vpn(src_ip, vpnms_config.vpnms_netmask, vpnms_config.vpnms_network) == 1) && (is_it_vpn(dst_ip, vpnms_config.vpnms_netmask, vpnms_config.vpnms_network) == 1) )
            {
            	//ничего не делаем, источник и пункт назначения vpn
            }
            else
            {
            	//исходящий трафик
            	if ( is_it_vpn(src_ip, vpnms_config.vpnms_netmask, vpnms_config.vpnms_network) == 1 )
            	{
            		local_flow = 0;
                	if(is_it_local(dst_ip)) local_flow = 1;

                    pUsername = username_by_ip(src_ip);

                    //Добавляем поток во временную таблицу для учета трафика
                    query = malloc(512);
                    sprintf(query,
          	        		"INSERT INTO `flows_tmp` ("
          	        		"`TimeStamp` ,"
          	        		"`Owner` ,"
          	        		"`SrcIp` ,"
          	        		"`SrcPort` ,"
          	        		"`DstIp` ,"
          	        		"`DstPort`, "
          	        		"`Bytes`, "
                    		"`Local`"
          	        		") "
          	        		"VALUES ("
          	        		" %lu, '%s', '%s', %u, '%s', %u, %u, %u"
          	        		")",
          	        		(unsigned long)time(NULL), pUsername, src_ip, ntohs (pData->r[i].s_port), dst_ip,
          	        		ntohs (pData->r[i].d_port), ntohl (pData->r[i].octets ), local_flow);
          	        exec_query_write(query);

                    //----

            		//Добавляем поток в базу, для ежечасного парсинга (если разрешено)
                    if ( 0 == strcasecmp(vpnms_config.vpnms_hourly_stat, "yes") )
                    {
                    	query = malloc(512);
                    	sprintf(query,
              	        		"INSERT INTO `flows` ("
              	        		"`TimeStamp` ,"
              	        		"`Owner` ,"
              	        		"`SrcIp` ,"
              	        		"`SrcPort` ,"
              	        		"`DstIp` ,"
              	        		"`DstPort`, "
              	        		"`Bytes`, "
                        		"`Local`"
              	        		") "
              	        		"VALUES ("
              	        		" %lu, '%s', '%s', %u, '%s', %u, %u, %u"
              	        		")",
              	        		(unsigned long)time(NULL), pUsername, src_ip, ntohs (pData->r[i].s_port), dst_ip,
              	        		ntohs (pData->r[i].d_port), ntohl (pData->r[i].octets ), local_flow);
              	        exec_query_write(query);
                    }
          	        //----

                    //Добавляем поток в архив (если разрешено)
                    if ( 0 == strcmp(vpnms_config.vpnms_keep_flows, "yes") )
                    {
                    	query = malloc(512);
                    	sprintf(query,
              	        		"INSERT INTO `flows_archive` ("
              	        		"`TimeStamp` ,"
              	        		"`Owner` ,"
              	        		"`SrcIp` ,"
              	        		"`SrcPort` ,"
              	        		"`DstIp` ,"
              	        		"`DstPort`, "
              	        		"`Bytes`, "
                        		"`Local`"
              	        		") "
              	        		"VALUES ("
              	        		" %lu, '%s', '%s', %u, '%s', %u, %u, %u"
              	        		")",
              	        		(unsigned long)time(NULL), pUsername, src_ip, ntohs (pData->r[i].s_port), dst_ip,
              	        		ntohs (pData->r[i].d_port), ntohl (pData->r[i].octets ), local_flow);
              	        exec_query_write(query);

                    }

              	    //----

					free(pUsername);
            	}

            	//входящий трафик
            	if ( is_it_vpn(dst_ip, vpnms_config.vpnms_netmask, vpnms_config.vpnms_network) == 1 )
            	{

                	local_flow = 0;
                	if(is_it_local(src_ip)) local_flow = 1;

                	pUsername = username_by_ip(dst_ip);

                	//Добавляем поток во временную таблицу для учета трафика

                	query = malloc(512);
          	        sprintf(query,
          	        		"INSERT INTO `flows_tmp` ("
          	        		"`TimeStamp` ,"
          	        		"`Owner` ,"
          	        		"`SrcIp` ,"
          	        		"`SrcPort` ,"
          	        		"`DstIp` ,"
          	        		"`DstPort`, "
          	        		"`Bytes`, "
          	        		"`Local`"
          	        		") "
          	        		"VALUES ("
          	        		" %lu, '%s', '%s', %u, '%s', %u, %u, %u"
          	        		")",
          	        		(unsigned long)time(NULL), pUsername, src_ip, ntohs (pData->r[i].s_port), dst_ip,
          	        		ntohs (pData->r[i].d_port), ntohl (pData->r[i].octets ), local_flow);
          	        exec_query_write(query);

                	//----


                	//Добавляем поток в базу, для ежечасного парсинга (если разрешено)
                    if ( 0 == strcasecmp(vpnms_config.vpnms_hourly_stat, "yes") )
                    {
                    	query = malloc(512);
                    	sprintf(query,
              	        		"INSERT INTO `flows` ("
              	        		"`TimeStamp` ,"
              	        		"`Owner` ,"
              	        		"`SrcIp` ,"
              	        		"`SrcPort` ,"
              	        		"`DstIp` ,"
              	        		"`DstPort`, "
              	        		"`Bytes`, "
              	        		"`Local`"
              	        		") "
              	        		"VALUES ("
              	        		" %lu, '%s', '%s', %u, '%s', %u, %u, %u"
              	        		")",
              	        		(unsigned long)time(NULL), pUsername, src_ip, ntohs (pData->r[i].s_port), dst_ip,
              	        		ntohs (pData->r[i].d_port), ntohl (pData->r[i].octets ), local_flow);
              	        exec_query_write(query);
                    }
          	        //----

                    //Добавляем поток в архив (если разрешено)
                    if ( 0 == strcmp(vpnms_config.vpnms_keep_flows, "yes") )
                    {
                    	query = malloc(512);
                    	sprintf(query,
              	        		"INSERT INTO `flows_archive` ("
              	        		"`TimeStamp` ,"
              	        		"`Owner` ,"
              	        		"`SrcIp` ,"
              	        		"`SrcPort` ,"
              	        		"`DstIp` ,"
              	        		"`DstPort`, "
              	        		"`Bytes`, "
              	        		"`Local`"
              	        		") "
              	        		"VALUES ("
              	        		" %lu, '%s', '%s', %u, '%s', %u, %u, %u"
              	        		")",
              	        		(unsigned long)time(NULL), pUsername, src_ip, ntohs (pData->r[i].s_port), dst_ip,
              	        		ntohs (pData->r[i].d_port), ntohl (pData->r[i].octets ), local_flow);
              	        exec_query_write(query);

                    }

                    //----

          	        free(pUsername);
            	}
            }
        }
    }
}
