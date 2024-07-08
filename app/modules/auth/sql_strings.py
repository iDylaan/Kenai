class Sql_Strings():
    GET_USER_IS_EXISTING = (
        '''
        SELECT COUNT(id_user) AS count, id_user AS id
        FROM users
        WHERE email = %(email)s
        GROUP BY id_user
        '''
    )

    INSERT_NEW_USER = (
        '''
        INSERT INTO users (email, image, name, family_name, given_name, last_connection, active_session_id, last_connection_ip, last_connection_browser)
        VALUES (%(email)s, %(picture)s, %(name)s, %(family_name)s, %(given_name)s, CURRENT_TIMESTAMP, %(session_id)s, %(ip_address)s, %(browser)s)
        '''
    )