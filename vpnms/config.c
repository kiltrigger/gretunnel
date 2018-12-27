#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <errno.h>

#include "config.h"

static int config_load_data(config_context_t* cnx);
static void config_cleanup_sections(config_context_t* cnx);
static config_section_t* create_section(const char* name);
static void free_section(config_section_t* section);
static config_param_t* create_param(const char* name, const char* value);
static void free_param(config_param_t* param);

config_context_t* config_open(const char* name)
{
	config_context_t* cnx = calloc(1, sizeof(config_context_t));
	if(!cnx)
	{
		printf("Memory allocation failed: %s", strerror(errno));
		return NULL;
	}
	cnx->fp = fopen(name, "r");
	if(!cnx->fp)
	{
		printf("Failed to open printf file '%s': %s", name, strerror(errno));
		free(cnx);
		return NULL;
	}
	if(config_reload(cnx) < 0)
	{
		config_cleanup_sections(cnx);
		free(cnx);
		return NULL;
	}
	return cnx;
}

int config_reload(config_context_t* cnx)
{
	rewind(cnx->fp);
	config_cleanup_sections(cnx);
	if(config_load_data(cnx) < 0)
	{
		config_cleanup_sections(cnx);
		return -1;
	}
	return 0;
}

config_section_t* config_get_section(config_context_t* cnx, const char* section_name)
{
	config_section_t* section;

	section = cnx->sections_queue;
	while(section)
	{
		if(!strcmp(section->name, section_name)) /* section found */
			break;
		section = section->next;
	}
	return section;
}

char* config_get_string(config_context_t* cnx, const char* section_name, const char* param_name)
{
	config_section_t* section;
	config_param_t* param;

	section = cnx->sections_queue;
	while(section)
	{
		if(!strcmp(section->name, section_name)) /* section found */
		{
			param = section->params_queue;
			while(param)
			{
				if(!strcmp(param->name, param_name)) /* param found */
					return param->value;
				param = param->next;
			}
		}
		section = section->next;
	}
	return NULL;
}

int config_get_int(config_context_t* cnx, const char* section, const char* param)
{
	char* str;
	str = config_get_string(cnx, section, param);
	return str ? atoi( str ) : 0;
}

double config_get_double(config_context_t* cnx, const char* section, const char* param)
{
	char* str;
	str = config_get_string(cnx, section, param);
	return str ? atof( str ) : 0;
}

int config_close(config_context_t* cnx)
{
	int ret;

	ret = fclose(cnx->fp);
	config_cleanup_sections(cnx);
	free(cnx);
	return 0;
}

static int config_load_data(config_context_t* cnx)
{
	char line_buf[128], *line, *eq_pos, *parm_name, *parm_val;
	size_t line_len;
	int lineno;
	config_section_t* cur_section, *new_section;
	config_param_t* cur_param, *new_param;

	cur_section = NULL;
	cur_param = NULL;
	lineno = 1;
	while(fgets(line_buf, sizeof(line_buf), cnx->fp))
	{
		line = trim(line_buf);
		if(line[0] == '#') /* comment found */
		{
			lineno++;
			continue;
		}
		line_len = strlen(line);
		if(!line_len) /* Empty line */
		{
			lineno++;
			continue;
		}
		if(line[0] == '[') /* section found */
		{
			if(line[line_len-1] != ']')
			{
				printf("Incorrect syntax at line %d. Expected ] at the end of section statement: %s.", lineno, line);
				return -1;
			}
			line[line_len-1] = '\0';
			new_section = create_section(line+1);
			if(!new_section)
			{
				printf("Memory allocation failed: %s", strerror(errno));
				return -1;
			}
			if(cur_section)
				cur_section->next = new_section;
			else
				cnx->sections_queue = new_section;
			cur_section = new_section;
			cur_param = NULL;
		}
		else /* param */
		{
			if(!cur_section)
			{
				printf("Incorrect syntax at line %d. Parameter is not in the group: %s.", lineno, line);
				return -1;
			}
			eq_pos = strchr(line, '=');
			if(!eq_pos)
			{
				printf("Incorrect syntax at line %d. Expected =: %s.", lineno, line);
				return -1;
			}
			*eq_pos = '\0';
			parm_name = trim(line);
			parm_val = trim(eq_pos + 1);
			new_param = create_param(parm_name, parm_val);
			if(!new_param)
			{
				printf("Memory allocation failed: %s.", strerror(errno));
				return -1;
			}
			if(cur_param)
				cur_param->next = new_param;
			else
				cur_section->params_queue = new_param;
			cur_param = new_param;
		}
		lineno++;
	}
	return 0;
}

static void config_cleanup_sections(config_context_t* cnx)
{
	config_section_t* section, *free_sect;

	section = cnx->sections_queue;
	while(section)
	{
		free_sect = section;
		section = section->next;
		free_section(free_sect);
	}
}

char* trim(char* str)
{
	char* beg_ptr, *end_ptr;

	beg_ptr = str;
	while((*beg_ptr == ' ') || (*beg_ptr == '\t')) beg_ptr++;

	end_ptr = &str[ strlen(str) - 1];
	while((*end_ptr == ' ') || (*end_ptr == '\t') ||
			(*end_ptr == '\r') || (*end_ptr == '\n'))
	{
		*end_ptr = '\0';
		end_ptr--;
	}

	return beg_ptr;
}

static config_section_t* create_section(const char* name)
{
	config_section_t* section = calloc(1, sizeof(config_section_t));
	if(!section)
		return NULL;
	section->name = malloc(strlen(name) + 1);
	if(!section->name)
	{
		free(section);
		return NULL;
	}
	strcpy(section->name, name);
	return section;
}

static void free_section(config_section_t* section)
{
	config_param_t* param, *free_parm;
	param = section->params_queue;
	while(param)
	{
		free_parm = param;
		param = param->next;
		free_param(free_parm);
	}
	free(section->name);
	free(section);
}

static config_param_t* create_param(const char* name, const char* value)
{
	config_param_t* param = calloc(1, sizeof(config_param_t));
	if(!param)
		return NULL;
	param->name = malloc(strlen(name) + 1);
	param->value = malloc(strlen(value) + 1);
	if((!param->name) || (!param->value))
	{
		free(param);
		return NULL;
	}
	strcpy(param->name, name);
	strcpy(param->value, value);
	return param;
}

static void free_param(config_param_t* param)
{
	free(param->name);
	free(param->value);
	free(param);
}

