import format from "pg-format";
import { pool } from "../db/connection.js";

async function getAllChildren() {
  const result = await pool.query(`SELECT * FROM children;`);

  return result.rows;
}

async function getChildById(child_id){
  const result = await pool.query("SELECT * FROM children WHERE child_id = $1;", [child_id]);
  return result.rows;
}

async function createChild(child) {
  const child_arr = Object.values(child);

  const result = await pool.query(
    format(`INSERT INTO children (
      child_name, child_sex, child_dob, child_birth_weight_lb, child_birth_weight_oz,
      child_food_preferences_breast_milk, child_food_preferences_formula,
      child_food_preferences_solids, child_alergies, family_id
    ) VALUES (%L);`, child_arr)
  );

  return result.rows;
}

export { getAllChildren, createChild, getChildById };
