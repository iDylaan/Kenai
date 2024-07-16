DROP TABLE IF EXISTS users, footprints, chats, prompts;

CREATE TABLE users (
  id_user SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR,
  image VARCHAR,
  name VARCHAR,
  family_name VARCHAR,
  given_name VARCHAR,
  last_connection TIMESTAMP,
  created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  active_session_id VARCHAR,
  last_connection_ip INET,
  last_connection_browser VARCHAR
);

CREATE table chats (
  id_chat SERIAL PRIMARY KEY,
  id_user INT REFERENCES users(id_user),
  chat_name VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE prompts (
  id SERIAL PRIMARY KEY,
  id_chat INT NOT NULL REFERENCES chats(id_chat),
  prompt TEXT NOT NULL,
  response TEXT,
  prompt_timestamp TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  response_timestamp TIMESTAMP,
  iteration SMALLINT DEFAULT 0,
  prompt_audio_link VARCHAR,
  response_audio_link VARCHAR
);
