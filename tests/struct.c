 #include <stdio.h>
 
 int main (void) {
 	
 	struct sconfig {
 	char name[20];
 	int port;
 	int pid;
 	};
    
    struct sconfig config;
    
    //config.name[0] = "v";
    config.port = 1723;
    config.pid = 23776;
        
    printf("Имя: , порт: %d, идентификатор процесса: %d \n", config.port, config.pid);
    
    return 0;
 }
 
