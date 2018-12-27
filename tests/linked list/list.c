/*
 * list.c
 *
 *  Created on: 16.09.2009
 *      Author: BURUT\admin
 */

#include <stdio.h>
#include <stdlib.h>

typedef struct node {
	int data;
	struct node *next; /* pointer to next element in list */
} LLIST;

LLIST *list_add(LLIST **p, int i);
void list_remove(LLIST **p);
LLIST **list_search(LLIST **n, int i);
void list_print(LLIST *n);

LLIST *list_add(LLIST **p, int i)
{
	LLIST *n = (LLIST *) malloc(sizeof(LLIST));
	if (n == NULL)
		return NULL;

	n->next = *p; /* the previous element (*p) now becomes the "next" element */
	*p = n;       /* add new empty element to the front (head) of the list */
	n->data = i;

	return *p;
}

void list_remove(LLIST **p) /* remove head */
{
	if (*p != NULL)
	{
		LLIST *n = *p;
		*p = (*p)->next;
		free(n);
	}
}

LLIST **list_search(LLIST **n, int i)
{
	while (*n != NULL)
	{
		if ((*n)->data == i)
		{
			return n;
		}
		n = &(*n)->next;
	}
	return NULL;
}

void list_print(LLIST *n)
{
	if (n == NULL)
	{
		printf("list is empty\n");
	}
	while (n != NULL)
	{
		printf("print %p %p %d\n", n, n->next, n->data);
		n = n->next;
	}
}


int main(void)
{
	LLIST *n = NULL;

	list_add(&n, 0); /* list: 0 */
	list_add(&n, 1); /* list: 1 0 */
	list_add(&n, 2); /* list: 2 1 0 */
	list_add(&n, 3); /* list: 3 2 1 0 */
	list_add(&n, 4); /* list: 4 3 2 1 0 */
	list_print(n);
	list_remove(&n);                 /* remove first (4) */
	list_remove(&n->next);           /* remove new second (2) */
	list_remove(list_search(&n, 1)); /* remove cell containing 1 (first) */
	list_remove(&n->next);           /* remove second to last node (0) */
	list_remove(&n);                 /* remove last (3) */
	list_print(n);

	return 0;
}
