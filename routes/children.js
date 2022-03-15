import express from "express";
import { param, body, validationResult } from "express-validator";
import {
  getAllChildren,
  getChildById,
  createChild,
} from "../models/children.js";

const router = express.Router();

router.get("/", async function (req, res, next) {

  try{
    const child = await getAllChildren();

  res.json({
    success: true,
    payload: child,
  });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      payload: "Sorry I couldnt get the package!",
    });
  }
});

router.post(
  "/",
  body("child_name").isLength({min:1, max: undefined}),
  body("child_sex").isString(),
  body("child_dob").isDate(),
  body("child_birth_weight_lb").isInt(),
  body("child_birth_weight_oz").isInt(),
  body("child_food_preferences_breast_milk").isBoolean(),
  body("child_food_preferences_formula").isBoolean(),
  body("child_food_preferences_solids").isBoolean(),
  body("child_alergies").isString(),
  body("family_id").isInt(),
  async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const child = await createChild(req.body);
      res.json({
        success: true,
        payload: child,
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

router.get(
  "/:child_id",
  param("child_id").isInt(),
  async function (req, res) {
    const childId = Number(req.params.child_id);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const child = await getChildById(childId);

    res.json({
      success: true,
      payload: child,
    });
  }
);

export default router;
