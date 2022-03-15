import { pool } from "../db/connection.js";
import format from "pg-format";

export async function getAllNappies() {
  const result = await pool.query(`SELECT * FROM nappies;`);
  return result.rows;
}

export async function getNappiesByChildId(child_id, limit) {
  const result = await pool.query(`SELECT * FROM nappies WHERE child_id = $1 ORDER BY nappy_id DESC LIMIT $2;`, [child_id, limit]);
  return result.rows;
}

export async function createNappies(nappy){

  const nappy_arr = Object.values(nappy);
 
    const result = await pool.query(
    format (`INSERT INTO nappies 
    (nappy_date, nappy_type, nappy_quantity, child_id, user_id) 
    VALUES (%L);`,nappy_arr)
    );

    return result.rows
}
