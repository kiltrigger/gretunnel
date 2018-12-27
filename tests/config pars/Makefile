testconfig: config.o testconfig.o
	gcc -o testconfig config.o testconfig.o

config.o: config.c config.h
	gcc -c config.c

testconfig.o: testconfig.c
	gcc -c testconfig.c

clean:
	rm -f *.o
	rm -f testconfig
    