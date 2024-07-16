class Sql_Strings():
    GET_CHAT_IS_EXISTING = (
        '''
        SELECT COUNT(id_chat) AS count
        FROM chats
        WHERE id_chat = %(chat_id)s
        '''
    )

    INSERT_NEW_CHAT = ( 
        "INSERT INTO chats (id_user, chat_name) VALUES "
        "(%(user_id)s, %(chat_name)s) "
        "RETURNING id_chat"
    )

    INSERT_NEW_CHAT_MESSAGE = (
        """
        INSERT INTO prompts (id_chat, prompt, iteration)
        VALUES (%(chat_id)s, %(prompt)s, %(iteration)s)
        RETURNING id
        """
    )

    UPDATE_KENAI_MESSAGE_RESPONSE = (
        '''
        UPDATE prompts SET response = %(response)s, response_timestamp = NOW() 
        WHERE id = %(prompt_id)s
        '''
    )

    GET_CHAT_MESSAGES = (
        '''
        SELECT prompt, response, iteration
        FROM prompts
        WHERE id_chat = %(chat_id)s
        ORDER BY id DESC
        LIMIT 10 OFFSET 0
        '''
    )