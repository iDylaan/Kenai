CREATE TABLE "Users" (
  "email" VARCHAR(255) PRIMARY KEY,
  "password" VARCHAR(255) NOT NULL,
  "image" TEXT,
  "name" VARCHAR(255) NOT NULL,
  "last_connection" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  "active_session_id" VARCHAR(255),
  "last_connection_ip" VARCHAR(45),
  "last_connection_browser" VARCHAR(255)
);

CREATE TABLE "Footprints" (
  "id" SERIAL PRIMARY KEY,
  "footprint" TEXT NOT NULL,
  "user_id" VARCHAR(255)
);

CREATE TABLE "Chats" (
  "id" SERIAL PRIMARY KEY,
  "user_id" VARCHAR(255),
  "chat_name" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "Prompts" (
  "id" SERIAL PRIMARY KEY,
  "chat_id" INT,
  "prompt" TEXT NOT NULL,
  "response" TEXT,
  "prompt_timestamp" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  "response_timestamp" TIMESTAMP,
  "iteration" INT DEFAULT 1,
  "user_audio_link" TEXT,
  "ai_audio_link" TEXT
);

ALTER TABLE "Footprints" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("email");

ALTER TABLE "Chats" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("email");

ALTER TABLE "Prompts" ADD FOREIGN KEY ("chat_id") REFERENCES "Chats" ("id");
