#include <stdio.h>
#include <stdlib.h>

typedef unsigned long long int myint;

typedef struct node {
	char *ip;
	myint input;
	myint output;
	myint local_input;
	myint local_output;
	struct node *next;
} LLIST;

LLIST *list_add(LLIST **p, char *ip, myint input, myint output, myint local_input, myint local_output)
{
	LLIST *n = (LLIST *) malloc(sizeof(LLIST));
	if (n == NULL)
		return NULL;

	n->next = *p;
	*p = n;
	n->input = input;
	n->output = output;
	n->ip = ip;

	return *p;
}


LLIST *list_search(LLIST **n, char *ip)
{
	while (*n != NULL)
	{
		if (strcasecmp ( (*n)->ip, ip ) == 0)
		{
			return *n;
		}
		n = &(*n)->next;
	}
	return NULL;
}

void list_destroy(LLIST **n)
{
	LLIST *cur = *n;

	while ( cur )
	{
		LLIST *to_delete = cur;
		cur = cur->next;
		free( to_delete );
	}

	*n = NULL;
}

int main(void)
{
	LLIST *cur = NULL;
	LLIST *start = NULL;
	LLIST *cur_copy = NULL;
	LLIST *start_copy = NULL;

	start = list_add(&cur, "10.1.1.0", 0, 0, 0, 0);
	start = list_add(&cur, "10.1.1.1", 1, 1, 0, 0);
	start = list_add(&cur, "10.1.1.2", 2, 2, 0, 0);
	start = list_add(&cur, "10.1.1.3", 3, 8, 0, 0);
	start = list_add(&cur, "10.1.1.4", 4, 4, 0, 0);

	cur_copy = start;
	start_copy = start;
	cur = NULL;
	start = NULL;

	start = list_add(&cur, "10.1.1.6", 4, 4, 0, 0);
	start = list_add(&cur, "10.1.1.7", 4, 4, 0, 0);
	start = list_add(&cur, "10.1.1.8", 4, 4, 0, 0);
	start = list_add(&cur, "10.1.1.9", 4, 4, 0, 0);
	start = list_add(&cur, "10.1.1.10", 4, 4, 0, 0);
	cur = start;

	while (cur_copy != NULL)
	{
		printf("print %s\n",cur_copy->ip);
		cur_copy = cur_copy->next;
	}
	printf("\n");

	cur_copy = start_copy;
	list_destroy(&cur_copy);

	while (cur_copy != NULL)
	{
		printf("print %s\n",cur_copy->ip);
		cur_copy = cur_copy->next;
	}
	printf("\n");
	while (cur != NULL)
	{
		printf("print %s\n",cur->ip);
		cur = cur->next;
	}

	//if (cur != NULL) printf("print %lld\n",cur->output);

	return 0;
}
