#include <stdio.h>
#include <stdlib.h>

void main(void)
{
   int *p, i;
   p = (int *) malloc(100 * sizeof(int)); /* Выделение памяти для 100 
                                             целых чисел */
   if (!p) 
   {
       printf("Недостаточно памяти\n");
       exit(1);
   }
   for (i = 0; i < 100; ++i) *(p+i) = i;    /* Использование памяти */
   for (i = 0; i < 100; ++i) printf("%d", *(p++) );
   free(p);                                   /* Освобождение памяти */
}
