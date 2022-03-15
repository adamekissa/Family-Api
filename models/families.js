import { pool } from "../db/connection.js";

export async function getAllFamilies() {
  const result = await pool.query("SELECT * FROM families;");
  return result.rows;
}

export async function getFamilyById(family_id) {
  const result = await pool.query("SELECT * FROM families WHERE family_id = $1;", [family_id]);
  return result.rows;
}

export async function createFamily(family_name) {
  const result = await pool.query(
    "INSERT INTO families (family_name) VALUES ($1) RETURNING *;",
    [family_name]
  );
  return result.rows;
}

export async function getFamilyName(family_name) {
  const result = await pool.query(
    "SELECT family_id FROM families WHERE family_name = $1;",
    [family_name]
  );
  return result.rows;
}

export async function getChildrenByFamilyId(family_id) {
  const result = await pool.query("SELECT * FROM children WHERE family_id = $1;", [family_id]);
  return result.rows;
}

export async function getUsersByFamilyId(family_id){
  const result = await pool.query("SELECT * FROM users WHERE family_id = $1;", [family_id]);
  return result.rows;
}
