import express from "express";
import { body, param, validationResult } from "express-validator";
import {
  getAllNappies,
  getNappiesByChildId,
  createNappies,
} from "../models/nappies.js";

const router = express.Router();

router.get("/", async function (req, res, next) {
  const nappies = await getAllNappies();
  if (nappies === []) {
    res.json({
      success: true,
      payload: "No nappies to display :(",
    });
  }

  res.json({
    success: true,
    payload: nappies,
  });
});

router.get(
  "/:child_id/:limit",
  param("child_id").isInt(),
  param("limit").isInt(),
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const nappies = await getNappiesByChildId(Number(req.params.child_id), Number(req.params.limit));

    res.json({
      success: true,
      payload: nappies,
    });
  }
);

router.post(
  "/",
  body("nappy_date").isString(),
  body("nappy_type").isString(),
  body("nappy_quantity").isString(),
  body("child_id").isInt(),
  body("user_id").isInt(),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const nappyToAdd = req.body;
    try {
      const addedNappy = await createNappies(nappyToAdd);

      res.json({
        success: true,
        payload: addedNappy,
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
