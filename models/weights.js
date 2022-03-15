import { pool } from "../db/connection.js";

export async function getAllWeights() {
  const result = await pool.query(`SELECT * FROM weights;`);
  return result.rows;
}

export async function getWeightsByChildId(child_id, limit) {
  const result = await pool.query(`SELECT * FROM weights WHERE child_id = $1 ORDER BY weight_id DESC LIMIT $2`, [
    child_id,
    limit
  ]);
  return result.rows;
}

export async function createWeight(newWeight) {
  const { weight_date, weight_lb, weight_oz, child_id, user_id } = newWeight;

  const result = await pool.query(
    `INSERT INTO weights (weight_date, weight_lb, weight_oz, child_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    [weight_date, weight_lb, weight_oz, Number(child_id), Number(user_id)]
  );
  return result.rows;
}
