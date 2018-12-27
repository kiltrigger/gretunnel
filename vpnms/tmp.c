/*
 * tmp.c
 *
 *  Created on: 27.10.2009
 *      Author: BURUT\admin
 */

#include <stdio.h>
#include <time.h>

int main()
{
	unsigned int		min;
	unsigned int		sec;
	time_t				t;
	struct tm			*gm;
	unsigned long int timestamp;

	t = time(NULL);
	gm = gmtime(&t);
	min = gm->tm_min;
	sec = gm->tm_sec;

	timestamp = (unsigned long)time(NULL);
//	timestamp = timestamp - min*60 - sec;

	printf("tm: %ld\n", timestamp);
	return 0;
}
