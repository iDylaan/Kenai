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
        INSERT INTO users (email, image, name, family_name, given_name, last_connection)
        VALUES (%(email)s, %(picture)s, %(name)s, %(family_name)s, %(given_name)s, CURRENT_TIMESTAMP)
        RETURNING id_user
        '''
    )

    GET_USER_BY_EMAIL = (
        '''
        SELECT * FROM users
        WHERE email = %(email)s
        '''
    )

    UPDATE_USER_SESSION = (
        '''
        UPDATE users SET active_session_id = %(session_id)s, 
        last_connection_ip = %(ip_address)s, 
        last_connection_browser = %(browser)s,
        last_connection = CURRENT_TIMESTAMP
        WHERE id_user = %(user_id)s
        '''
    )