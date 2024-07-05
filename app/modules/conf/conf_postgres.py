from app import app
import psycopg2

def qry(query, params=None, fetchone=False):
    try:
        conn = psycopg2.connect(
            host=app.config["PGL_HOST"],
            database=app.config["PGL_DB"],
            user=app.config["PGL_USER"],
            password=app.config["PGL_PASS"],
            port=app.config["PGL_PORT"]
        )
        cursor = conn.cursor()
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        if fetchone:
            result = cursor.fetchone()
            if result:
                column_names = [desc[0] for desc in cursor.description]
                result = dict(zip(column_names, result))
        else:
            column_names = [desc[0] for desc in cursor.description]
            records = cursor.fetchall()
            result = [dict(zip(column_names, record)) for record in records]
        conn.commit()
        cursor.close()
        conn.close()
        return result
    except Exception as e:
        raise Exception(f'Error al ejecutar consulta en qry/{str(e)}')
def qry_bulk(query, params_tuple):
    results = []
    try:
        conn = psycopg2.connect(
            host=app.config["PGL_HOST"],
            database=app.config["PGL_DB"],
            user=app.config["PGL_USER"],
            password=app.config["PGL_PASS"],
            port=app.config["PGL_PORT"]
        )
        cursor = conn.cursor()

        # Iterar sobre cada conjunto de parámetros en la tupla
        for params in params_tuple:
            cursor.execute(query, params)
            # Recoger todos los resultados en una lista
            records = cursor.fetchall()
            column_names = [desc[0] for desc in cursor.description]
            results.extend([dict(zip(column_names, record)) for record in records])
        conn.commit()
    except Exception as e:
        conn.rollback()  # Asegurarse de revertir cualquier cambio si algo va mal
        raise Exception(f'Error al ejecutar consulta en qry_bulk/{str(e)}')
    finally:
        cursor.close()
        conn.close()

    return results
def sql(sql, params=None):
    try:
        conn = psycopg2.connect(
            host=app.config["PGL_HOST"],
            database=app.config["PGL_DB"],
            user=app.config["PGL_USER"],
            password=app.config["PGL_PASS"],
            port=app.config["PGL_PORT"]
        )
        cursor = conn.cursor()
        if params:
            cursor.execute(sql, params)
        else:
            cursor.execute(sql)

        conn.commit()
        rows_affected = cursor.rowcount
        cursor.close()
        conn.close()
        return int(rows_affected)
    except Exception as e:
        raise Exception(f"Error al ejecutar la consulta en sql/{str(e)}")

def sql_bulk(sql, params):
    try:
        conn = psycopg2.connect(
            host=app.config["PGL_HOST"],
            database=app.config["PGL_DB"],
            user=app.config["PGL_USER"],
            password=app.config["PGL_PASS"],
            port=app.config["PGL_PORT"]
        )
        cursor = conn.cursor()
        # Usar executemany para insertar múltiples registros
        cursor.executemany(sql, params)
        conn.commit()
        rows_affected = cursor.rowcount
        cursor.close()
        conn.close()
        return rows_affected
    except Exception as e:
        raise Exception(f"Error al ejecutar la inserción masiva en sql_bulk_insert/{str(e)}")

def execute_sql_script(sql_script):
    try:
        conn = psycopg2.connect(
            host=app.config["PGL_HOST"],
            database=app.config["PGL_DB"],
            user=app.config["PGL_USER"],
            password=app.config["PGL_PASS"],
            port=app.config["PGL_PORT"]
        )
        cursor = conn.cursor()
        # Ejecuta cada sentencia del script
        cursor.execute(sql_script)
        conn.commit()
        cursor.close()
    except Exception as e:
        conn.rollback()
        raise Exception(f"Error al ejecutar el script SQL: {e}")
def sqlv2(sql, params=None, return_id=False):
    try:
        conn = psycopg2.connect(
            host=app.config["PGL_HOST"],
            database=app.config["PGL_DB"],
            user=app.config["PGL_USER"],
            password=app.config["PGL_PASS"],
            port=app.config["PGL_PORT"]
        )
        cursor = conn.cursor()

        if params:
            cursor.execute(sql, params)
        else:
            cursor.execute(sql)

        rows_affected = cursor.rowcount
        id_of_new_row = None

        if return_id:
            result = cursor.fetchone()
            if result is not None:
                id_of_new_row = result[0]
            else:
                raise Exception("No results to fetch")

        conn.commit()
        cursor.close()
        conn.close()

        return rows_affected, id_of_new_row

    except Exception as e:
        raise Exception(f"Error al ejecutar la consulta en sql/{str(e)}")