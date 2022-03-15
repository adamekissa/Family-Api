import { pool } from "../db/connection.js";

export async function getAllUsers() {
  const result = await pool.query("SELECT * FROM users;");
  return result.rows;
}

export async function getUserById(user_id) {
  const result = await pool.query("SELECT * FROM users WHERE user_id = $1;", [user_id]);
  return result.rows;
}

export async function getUserByEmail(user_email) {
  const result = await pool.query("SELECT * FROM users WHERE user_email = $1;", [user_email]);
  return result.rows;
}

export async function createUser(user) {
  const { user_name, user_email, user_role, family_id } = user;
  
  const result = await pool.query(
    "INSERT INTO users (user_name, user_email, user_role, family_id) VALUES ($1, $2, $3, $4) RETURNING *;",
    [user_name, user_email, user_role, Number(family_id)]
  );
  
  return result.rows;
}
