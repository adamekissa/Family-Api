import express from "express";
import { param, body, validationResult } from "express-validator";
import {
  createWeight,
  getAllWeights,
  getWeightsByChildId,
} from "../models/weights.js";

const router = express.Router();

router.get("/", async function (req, res) {
  const weights = await getAllWeights();

  if (weights === []) {
    res.json({
      success: false,
      message: "no weights found :(",
    });
  }

  res.json({
    success: true,
    payload: weights,
  });
});

router.get("/:child_id/:limit",param("child_id").isInt(), param("limit").isInt(), async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const weights = await getWeightsByChildId(Number(req.params.child_id), Number(req.params.limit));

  res.json({
    success: true,
    payload: weights,
  });
});

router.post(
  "/",
  body("weight_date").isString(),
  body("weight_lb").isInt(),
  body("weight_oz").isInt(),
  body("child_id").isInt(),
  body("user_id").isInt(),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const weight = req.body;
    try {
      const addedWeight = await createWeight(weight);
      res.json({
        success: true,
        payload: addedWeight,
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
