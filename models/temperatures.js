import { pool } from "../db/connection.js";

export async function getAllTemperatures() {
  const result = await pool.query(`SELECT * FROM temperatures;`);
  return result.rows;
}

export async function getTemperaturesByChildId(child_id, limit) {
  console.log('getTemperaturesByChildId: ', child_id, limit)
  const result = await pool.query(
    `SELECT * FROM temperatures WHERE child_id = $1 ORDER BY temperature_id DESC LIMIT $2;`,
    [child_id, limit]
  );

  return result.rows;
}

export async function createTemperature(newTemperature) {
  const { temperature_date, temperature, child_id, user_id } = newTemperature;

  const result = await pool.query(
    `INSERT INTO temperatures (temperature_date, temperature, child_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *;`,
    [temperature_date, temperature, child_id, user_id]
  );

  return result.rows;
}
