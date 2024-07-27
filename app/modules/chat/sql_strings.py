class Sql_Strings():
    GET_CHATS_BY_USER_ID = (
        """
        SELECT 
        	id_chat,
        	chat_name,
        	created_at,
            last_update
        FROM chats
        WHERE id_user IS NOT NULL
        AND id_user = %(id_user)s
        AND active = TRUE
        ORDER BY last_update DESC
        """
    )

    GET_CHAT_MESSAGES_BY_CHAT_ID = (
        """
        SELECT 
        	prompt,
        	response,
        	prompt_timestamp,
        	response_timestamp,
        	prompt_audio_link,
        	response_audio_link,
            iteration
        FROM prompts
        WHERE id_chat = %(id_chat)s
        ORDER BY iteration ASC
        """
    )


    DELETE_CHAT_BY_ID = (
        """
        UPDATE chats SET active = FALSE
        WHERE id_chat = %(id_chat)s
        AND id_user = %(id_user)s
        """
    )

    RENAME_CHAT_BY_ID = (
        """
        UPDATE chats SET chat_name = %(title)s
        WHERE id_chat = %(id_chat)s
        AND id_user = %(id_user)s
        """
    )