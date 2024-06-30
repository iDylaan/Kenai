import sys
from flask import Blueprint, jsonify, request
from app.modules.utils.misc import handleResponse, handleErrorResponse
from app.modules.conf.conf_postgres import qry
from .sql_strings import Sql_Strings as SQL_S

mod = Blueprint('postgres', __name__, url_prefix='/postgres')


@mod.route('/status', methods=['GET'])
def postgres_status():
    
    postgres_status_data = {}
    
    try:
        postgres_status_data ['version'] = qry(SQL_S.GET_PGL_VERSION,None,True)
        postgres_status_data ['date_time'] = qry(SQL_S.GET_TIME_DATE_PGL,None,True)
        postgres_status_data ['date_time']['current_date'] = postgres_status_data ['date_time']['current_date'] .isoformat() 
        postgres_status_data ['date_time']['current_time'] = postgres_status_data ['date_time']['current_time'] .isoformat() 
        postgres_status_data ['tables'] = []
        pgl_tables = qry(SQL_S.GET_PGL_TABLES)
        
        
        for table in pgl_tables:
            print(table)
            colums = qry(SQL_S.GET_PGL_COLUMS_BY_TABLE,table)
            table_dict = {
                'table_name':table,
                'table_colums':colums,
            }
            postgres_status_data ['tables'] .append(table_dict)  
            
        
            
        return handleResponse(postgres_status_data)

        
    except Exception as e:
        print('Ha ocurrido un error en @postgres_status/{} en la linea {}'.format(e,
              sys.exc_info()[-1].tb_lineno))
        handleErrorResponse("Error interno en el servidor")
