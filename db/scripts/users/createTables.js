import { pool } from "../../connection.js";

await pool.query(
  `
  DROP TABLE IF EXISTS families CASCADE;

  CREATE TABLE families (
    family_id serial PRIMARY KEY,
    family_name text,
    family_created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
  );
  
  DROP TABLE IF EXISTS users CASCADE;
  
  CREATE TABLE users (
    user_id serial PRIMARY KEY,
    user_name text,
    user_email text,
    user_role text,
    user_created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    family_id integer REFERENCES families (family_id)
  );
  
  DROP TABLE IF EXISTS children CASCADE;
  
  CREATE TABLE children (
    child_id serial PRIMARY KEY,
    child_name text,
    child_sex text,
    child_dob date,
    child_birth_weight_lb integer,
    child_birth_weight_oz integer,
    child_food_preferences_breast_milk boolean,
    child_food_preferences_formula boolean,
    child_food_preferences_solids boolean,
    child_alergies text,
    child_created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    family_id integer REFERENCES families (family_id)
  );
  
  DROP TABLE IF EXISTS feeds;
  
  CREATE TABLE feeds (
    feed_id serial PRIMARY KEY,
    feed_type text,
    feed_date timestamp with time zone,
    feed_amount_offered text,
    feed_amount_drunk text,
    feed_duration integer,
    feed_last_side text,
    child_id integer REFERENCES children (child_id),
    user_id integer REFERENCES users (user_id)
  );
  
  DROP TABLE IF EXISTS nappies;
  
  CREATE TABLE nappies (
    nappy_id serial PRIMARY KEY,
    nappy_date timestamp with time zone,
    nappy_type text,
    nappy_quantity text,
    child_id integer REFERENCES children (child_id),
    user_id integer REFERENCES users (user_id)
  );
  
  DROP TABLE IF EXISTS weights;

  CREATE TABLE weights (
    weight_id serial PRIMARY KEY,
    weight_date timestamp with time zone,
    weight_lb integer,
    weight_oz integer,
    child_id integer REFERENCES children (child_id),
    user_id integer REFERENCES users (user_id)
  );
  
  DROP TABLE IF EXISTS temperatures;
  
  CREATE TABLE temperatures (
    temperature_id serial PRIMARY KEY,
    temperature_date timestamp with time zone,
    temperature decimal,
    child_id integer REFERENCES children (child_id),
    user_id integer REFERENCES users (user_id)
  );
  
  DROP TABLE IF EXISTS sleeps;
  
  CREATE TABLE sleeps (
    sleep_id serial PRIMARY KEY,
    sleep_start timestamp with time zone,
    sleep_end timestamp with time zone,
    sleep_duration_ms integer,
    child_id integer REFERENCES children (child_id),
    user_id integer REFERENCES users (user_id)
  );
  `
);

await pool.end();

console.log("Table creation complete.");
