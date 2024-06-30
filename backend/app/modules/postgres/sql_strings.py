
class Sql_Strings():
    GET_PGL_VERSION = (
        '''
        SELECT VERSION()
        '''
    )
    GET_TIME_DATE_PGL = (
        '''
        SELECT CURRENT_DATE, CURRENT_TIME
        '''
    )
    GET_PGL_TABLES = (
        '''
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname NOT IN ('information_schema', 'pg_catalog')
        ORDER BY schemaname, tablename
        '''
    )

    GET_PGL_COLUMS_BY_TABLE = (
        '''
        SELECT
        column_name,
        data_type,
        character_maximum_length,
        is_nullable,
        column_default
        FROM
        information_schema.columns
        WHERE
        table_schema NOT IN ('information_schema', 'pg_catalog')
        AND table_name = %(tablename)s
        ORDER BY
        table_schema,
        table_name,
        ordinal_position
        '''
    )
