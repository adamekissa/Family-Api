import express from "express";
import { body, param, validationResult } from "express-validator";
import { getAllFeeds, getFeedsByChildId, getSolidsByChildId, createFeed, createSolid } from "../models/feeds.js";

const router = express.Router();

router.get("/", async function (req, res) {
  const feeds = await getAllFeeds();

  if (feeds.length === 0) {
    res.json({
        success: true,
        payload: "No feeds to display :(",
      });
  }

  res.json({
    success: true,
    payload: feeds,
  });
});

router.get("/:child_id/:limit",
  param("child_id").isInt(),
  param("limit").isInt(),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const feeds = await getFeedsByChildId(Number(req.params.child_id), Number(req.params.limit));

    res.json({
      success: true,
      payload: feeds,
    });
  }
);

router.get("/solids/:child_id/:limit",
  param("child_id").isInt(),
  param("limit").isInt(),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const solids = await getSolidsByChildId(Number(req.params.child_id), Number(req.params.limit));

    res.json({
      success: true,
      payload: solids,
    });
  }
);

router.post("/",
  body('feed_type').isString(),
  body('feed_date').isString(),
  body('feed_amount_offered').isString(),
  body('feed_amount_drunk').isString(),
  body('feed_duration').isDecimal(), 
  body('feed_last_side').isLength(1),
  body('child_id').isInt(),
  body('user_id').isInt(),
  async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const feed = req.body;

    try {
      const addedFeed = await createFeed(feed)
      res.json({ success: true, payload: addedFeed, });
    }
    catch (err) {
      res.json({
        success: false,
        payload: "You cannot insert an empty fkey column!",
      });
    }
  }
);

router.post("/solids",
  body('feed_type').isString(),
  body('feed_date').isString(),
  body('feed_amount_offered').isString(),
  body('child_id').isInt(),
  body('user_id').isInt(),
  async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const solid = req.body;

    try {
      const addedSolid = await createSolid(solid)
      res.json({ success: true, payload: addedSolid, });
    }
    catch (err) {
      res.json({
        success: false,
        payload: "You cannot insert an empty fkey column!",
      });
    }
  }
);

export default router;
