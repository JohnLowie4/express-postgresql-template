DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_phone_number CASCADE;
DROP TABLE IF EXISTS user_account CASCADE;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE user_phone_number (
  ID SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  phone_number VARCHAR(255) NOT NULL,
  number_type VARCHAR(255) NOT NULL
);

CREATE TABLE user_account (
  ID SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  account_type VARCHAR(255) NOT NULL,
  interest_rate NUMERIC NOT NULL
);

\i src/db/seeds/01_users.sql
\i src/db/seeds/02_user_phone_number.sql
\i src/db/seeds/03_user_account.sql