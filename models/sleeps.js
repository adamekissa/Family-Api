import format from "pg-format";
import { pool } from "../db/connection.js";

export async function getAllSleeps() {
  const result = await pool.query(`SELECT * FROM sleeps;`);
  return result.rows;
}

export async function getSleepsByChildID(childId){
  const result = await pool.query(`SELECT * FROM sleeps WHERE child_id = $1;`, [childId]);
  return result.rows;
}

export async function createSleep(sleep) {
  const sleep_arr = Object.values(sleep);

  const result = await pool.query(
    format(`INSERT INTO sleeps (
      sleep_start, sleep_end, sleep_duration_ms, child_id, user_id)
      VALUES (%L) RETURNING *;`, sleep_arr
    )
  );
  
  return result.rows;
}
