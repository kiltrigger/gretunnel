mysqlclient2: mysqlclient2.o
	gcc -o mysqlclient2 mysqlclient2.o -lmysqlclient -lz
	
mysqlclient2.o: mysqlclient2.c
	gcc -c mysqlclient2.c	

clean:
	rm -f *.o
	rm -f mysqlclient
