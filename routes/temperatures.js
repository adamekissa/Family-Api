import express from "express";
import { param, body, validationResult } from "express-validator";
import {
  getAllTemperatures,
  getTemperaturesByChildId,
  createTemperature,
} from "../models/temperatures.js";

const router = express.Router();

router.get("/", async function (req, res, next) {
  const temperatures = await getAllTemperatures();
  if (temperatures === []) {
    res.json({
      success: true,
      payload: "No temperatures to display :(",
    });
  }

  res.json({
    success: true,
    payload: temperatures,
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

    const temperatures = await getTemperaturesByChildId(
      Number(req.params.child_id),
      Number(req.params.limit)
    );

    res.json({
      success: true,
      payload: temperatures,
    });
  }
);

router.post(
  "/",
  body("temperature_date").isString(),
  body("temperature").isDecimal(),
  body("child_id").isInt(),
  body("user_id").isInt(),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const temperature = req.body;
    try {
      const addTemperature = await createTemperature(temperature);

      res.json({
        success: true,
        payload: addTemperature,
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
