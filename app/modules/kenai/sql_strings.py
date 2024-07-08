class Sql_Strings():
    GET_CHAT_IS_EXISTING = (
        '''
        SELECT COUNT(id_chat) AS count
        FROM chats
        WHERE id_chat = %(chat_id)s
        '''
    )