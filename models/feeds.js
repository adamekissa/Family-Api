import { pool } from "../db/connection.js";
import format from "pg-format";

export async function getAllFeeds() {
  const result = await pool.query("SELECT * FROM feeds;");

  return result.rows;
}

export async function getFeedsByChildId(child_id, limit) {
  const result = await pool.query(
    "SELECT * FROM feeds WHERE child_id = $1 AND feed_amount_drunk IS NOT NULL ORDER BY feed_id DESC LIMIT $2;",
    [child_id, limit]
  );

  return result.rows;
}

export async function getSolidsByChildId(child_id, limit) {
  const result = await pool.query(
    "SELECT * FROM feeds WHERE child_id = $1 AND feed_amount_drunk IS NULL ORDER BY feed_id DESC LIMIT $2;",
    [child_id, limit]
  );

  return result.rows;
}

export async function createFeed(feed) {
  const feed_arr = Object.values(feed);

  const result = await pool.query(
    format(`INSERT INTO feeds (
      feed_type, feed_date, feed_amount_offered, feed_amount_drunk, 
      feed_duration, feed_last_side, child_id, user_id
    ) VALUES (%L) RETURNING *;`, feed_arr)
  );

  return result.rows;
}

export async function createSolid(solid) {
  const solid_arr = Object.values(solid);

  const result = await pool.query(
    format(`INSERT INTO feeds (
      feed_type, feed_date, feed_amount_offered, child_id, user_id
    ) VALUES (%L) RETURNING *;`, solid_arr)
  );
  
  return result.rows;
}

export async function getLastFeedById(child_id) {
  const result = await pool.query(
    `SELECT DISTINCT ON(feeds.child_id) feeds.user_id, feeds.date, feeds.type, feeds.amount_offered, feeds.amount_drunk, feeds.duration, feeds.side_last_fed_on AS currentFeed from feeds WHERE child.id = $1 `,
    [child_id]
  );
  return result.rows;
}
