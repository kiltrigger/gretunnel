#include <stdio.h>
#include <stdlib.h>

typedef unsigned long long int myint;

typedef struct node {
	char ip[16];
	myint input;
	myint output;
	myint local_input;
	myint local_output;
	struct node *next;
} LLIST;

LLIST *list_add(LLIST **p, myint input, myint output, myint local_input, myint local_output)
{
	LLIST *n = (LLIST *) malloc(sizeof(LLIST));
	if (n == NULL)
		return NULL;

	n->next = *p;
	*p = n;
	n->input = input;
	n->output = output;

	return *p;
}


LLIST *list_search(LLIST **n, myint input)
{
	while (*n != NULL)
	{
		if ((*n)->input == input)
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

	start = list_add(&cur, 0, 0, 0, 0);
	start = list_add(&cur, 1, 1, 0, 0);
	start = list_add(&cur, 2, 2, 0, 0);
	start = list_add(&cur, 3, 8, 0, 0);
	start = list_add(&cur, 4, 4, 0, 0);

	cur = start;
	cur = list_search(&cur, 3);

	//list_destroy(&cur);
	//list_destroy(&start);

	printf("print %lld\n",cur->input);
	//printf("print %lld\n",start->input);

	//if (cur != NULL) printf("input %lld\n", cur->input );

	return 0;
}
