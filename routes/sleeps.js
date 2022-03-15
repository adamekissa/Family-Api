import express from "express";
import { body, param, validationResult } from "express-validator";
import {
  getAllSleeps,
  getSleepsByChildID,
  createSleep,
} from "../models/sleeps.js";

const router = express.Router();

router.get("/", async function (req, res, next) {
  const sleeps = await getAllSleeps();

  if (sleeps === []) {
    res.json({
      success: true,
      payload: "No sleeps to display :(",
    });
  }

  res.json({
    success: true,
    payload: sleeps,
  });
});

router.get("/:child_id", param("child_id").isInt(), async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const sleep = await getSleepsByChildID(Number(req.params.child_id));

  res.json({
    success: true,
    payload: sleep,
  });
});

router.post(
  "/",
  body("sleep_start").isString(),
  body("sleep_end").isString(),
  body("sleep_duration_ms").isInt(),
  body("child_id").isInt(),
  body("user_id").isInt(),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const sleep = req.body;
    try {
      const sleepAdded = await createSleep(sleep);
      res.json({
        success: true,
        payload: sleepAdded,
      });
    } catch (err) {
      console.log(err);
      res.json({
        success: false,
        payload: "You cannot insert an empty fkey column!",
      });
    }
  }
);

export default router;
