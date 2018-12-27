/*
 * list3.c
 *
 *  Created on: 17.09.2009
 *      Author: BURUT\admin
 */

struct s_nfbuf {
	char ip[16];
	long long input;
	long long output;
	long long local_input;
	long long local_output;
	struct nfbuf *next;
} nfbuf;


void slstore(struct nfbuf *i, struct nfbuf **last)
{
  if(!*last) *last = i;
  else (*last)->next = i;
  i->next = NULL;
  *last = i;
}


int main(void)
{

	return 0;
}
