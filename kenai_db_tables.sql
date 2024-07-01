drop table if exists users, footprints, chats, prompts;

CREATE TABLE users (
  id_user SERIAL primary key,
  email VARCHAR UNIQUE,
  password VARCHAR NOT NULL,
  image VARCHAR,
  name VARCHAR NOT NULL,
  last_connection TIMESTAMP,
  created_at TIMESTAMP default (CURRENT_TIMESTAMP),
  active_session_id VARCHAR,
  last_connection_ip INET,
  last_connection_browser VARCHAR
);

CREATE TABLE footprints (
  id_footprint SERIAL PRIMARY KEY,
  footprint BYTEA NOT NULL,
  id_user INT references users(id_user)
);

CREATE table chats (
  id_chat SERIAL PRIMARY KEY,
  id_user INT references users(id_user),
  chat_name VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE prompts (
  id SERIAL PRIMARY KEY,
  id_chat INT references chats(id_chat),
  prompt TEXT NOT NULL,
  response TEXT,
  prompt_timestamp TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  response_timestamp TIMESTAMP,
  iteration SMALLINT DEFAULT 0,
  prompt_audio_link VARCHAR,
  response_audio_link VARCHAR
);
