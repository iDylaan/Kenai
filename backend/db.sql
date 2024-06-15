
Table "Usuarios" {
  "email" VARCHAR(255) [pk]
  "contraseña" VARCHAR(255) [not null]
  "imagen" TEXT
  "nombre" VARCHAR(255) [not null]
  "ultima_conexion" TIMESTAMP
  "cuando_se_creo" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "id_session_activa" VARCHAR(255)
  "ip_ultima_conexion" VARCHAR(45)
  "navegador_ultima_conexion" VARCHAR(255)
}

Table "Huellas" {
  "id" SERIAL [pk, increment]
  "huella" TEXT [not null]
  "id_usuario" VARCHAR(255)
}

Table "Chats" {
  "id" SERIAL [pk, increment]
  "id_usuario" VARCHAR(255)
  "nombre_chat" VARCHAR(255) [not null]
  "cuando_se_creo" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "Prompts" {
  "id" SERIAL [pk, increment]
  "id_chat" INT
  "prompt" TEXT [not null]
  "response" TEXT
  "dt_prompt" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "dt_response" TIMESTAMP
  "iteracion" INT [default: 1]
}

Ref:"Usuarios"."email" < "Huellas"."id_usuario"

Ref:"Usuarios"."email" < "Chats"."id_usuario"

Ref:"Chats"."id" < "Prompts"."id_chat"
