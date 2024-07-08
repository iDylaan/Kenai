import sys
from flask import Blueprint
from app.modules.utils.misc import handleResponse, handleErrorResponse, logging_error
from app.modules.conf.conf_postgres import qry
from .sql_strings import Sql_Strings as SQL_S

mod = Blueprint('postgres', __name__, url_prefix='/postgres')


@mod.route('/status', methods=['GET'])
def postgres_status():
    
    postgres_status_data = {}
    
    try:
        postgres_status_data ['version'] = qry(SQL_S.GET_PGL_VERSION,None,True)
        postgres_status_data ['version'] = postgres_status_data ['version']['version']
        postgres_status_data ['date_time'] = qry(SQL_S.GET_TIME_DATE_PGL,None,True)
        postgres_status_data ['date_time']['current_date'] = postgres_status_data ['date_time']['current_date'] .isoformat() 
        postgres_status_data ['date_time']['current_time'] = postgres_status_data ['date_time']['current_time'] .isoformat() 
        postgres_status_data ['tables'] = []
        pgl_tables = qry(SQL_S.GET_PGL_TABLES)
        for table in pgl_tables:
            colums = qry(SQL_S.GET_PGL_COLUMS_BY_TABLE,table)
            table_dict = {
                'table_name':table['tablename'],
                'table_colums':colums,
            }
            postgres_status_data['tables'].append(table_dict)  
        return handleResponse(postgres_status_data)
    except Exception as e:
        print('Ha ocurrido un error en @postgres_status/{} en la linea {}'.format(e,
              sys.exc_info()[-1].tb_lineno))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        logging_error({
            'fname': str(exc_tb.tb_frame.f_code.co_filename),
            'exc_type': str(exc_type),
            'lineno': str(exc_tb.tb_lineno),
            'error': str(e),
            'defname': 'postgres_status'
        })
        return handleErrorResponse(e)
