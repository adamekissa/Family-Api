import format from "pg-format";
import { pool } from "../../connection.js";

// Arrays of dummy data
const families = [["Family 1"], ["Family 2"], ["Family 3"]];

const users = [
  ["Cigdem Ozturk", "cigdemozturk_@hotmail.com", "mom", "1"],
  ["Andreas Johansson", "flonken@hotmail.com", "dad", "2"],
  ["Angela Gonzales", "angelagonzalez0707@hotmail.com", "nanny", "1"],
  ["Square Pants", "squarepants@hotmail.com", "nanny", "3"]
];

const children = [
  ['Bobbington', 'Male', '02/22/2022', 11, 5, true, false, false, 'dairy', 2],
  ['Appleberry', 'Female', '2022-02-25', 11, 5, true, false, false, 'dairy', 2]
];

const feeds = [['solid', '2022-02-22 12:34:50', '200g', '0', 5, '', 2, 2]];
const nappies = [['2022-02-22 12:34:50', 'poo', 'medium', 2, 2]];
const weights = [['2022-02-22 12:34:50', 13, 2, 2, 2]];
const temperatures = [['2022-02-22 12:34:50', 36.8, 2, 2]];
const sleeps = [['2022-02-22 12:34:50', '2022-02-22 12:40:50', 360000, 2, 2]];

// Running queries to insert data
await pool.query(
  format("INSERT INTO families (family_name) VALUES %L;", families)
);
await pool.query(
  format(`INSERT INTO users (
    user_name, user_email, user_role, family_id
  ) VALUES %L`, users)
);
await pool.query(
  format(`INSERT INTO children (
    child_name, child_sex, child_dob, child_birth_weight_lb, child_birth_weight_oz,
    child_food_preferences_breast_milk, child_food_preferences_formula,
    child_food_preferences_solids, child_alergies, family_id
  ) VALUES %L`, children)
);
await pool.query(
  format(`INSERT INTO feeds (
    feed_type, feed_date, feed_amount_offered, feed_amount_drunk,
    feed_duration, feed_last_side, child_id, user_id
  ) VALUES %L`, feeds)
);
await pool.query(
  format(`INSERT INTO nappies (
    nappy_date, nappy_type, nappy_quantity, child_id, user_id
  ) VALUES %L`, nappies)
);
await pool.query(
  format(`INSERT INTO weights (
    weight_date, weight_lb, weight_oz, child_id, user_id
  ) VALUES %L`, weights)
);
await pool.query(
  format(`INSERT INTO temperatures (
    temperature_date, temperature, child_id, user_id
  ) VALUES %L`, temperatures)
);
await pool.query(
  format(`INSERT INTO sleeps (
    sleep_start, sleep_end, sleep_duration_ms, child_id, user_id
  ) VALUES %L`, sleeps)
);

await pool.end();

console.log("Table population complete.");
