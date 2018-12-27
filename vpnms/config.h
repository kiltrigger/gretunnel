#ifndef _CONFIG_H_
#define _CONFIG_H_

#include <stdio.h>

struct config_param;
typedef struct config_param
{
	struct config_param* next;
	char* name;
	char* value;
} config_param_t;

struct config_section;
typedef struct config_section
{
	struct config_section* next;
	char* name;
	config_param_t* params_queue;
} config_section_t;

typedef struct config_context
{
	FILE* fp;
	config_section_t* sections_queue;
} config_context_t;

config_context_t* config_open(const char* name);
int config_reload(config_context_t* cnx);
config_section_t* config_get_section(config_context_t* cnx, const char* section_name);
char* config_get_string(config_context_t* cnx, const char* section_name, const char* param_name);
int config_get_int(config_context_t* cnx, const char* section_name, const char* param_name);
double config_get_double(config_context_t* cnx, const char* section, const char* param);
int config_close(config_context_t* cnx);
char* trim(char* str);

#endif /* _CONFIG_H_ */
