import express from "express";
import { param, body, validationResult } from "express-validator";
import {
  getAllFamilies,
  getFamilyById,
  createFamily,
  getFamilyName,
  getChildrenByFamilyId,
  getUsersByFamilyId,
} from "../models/families.js";

const router = express.Router();

router.get("/", async function (req, res) {
  if (req.query.family_name) {
    const family = await getFamilyName(req.query.family_name);
    res.json({
      success: true,
      payload: family,
    });
  } else {
    const families = await getAllFamilies();

    res.json({
      success: true,
      payload: families,
    });
  }
});

router.get(
  "/:family_id",
  param("family_id").isInt(),
  async function (req, res) {
    const familyId = Number(req.params.family_id);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const family = await getFamilyById(familyId);

    res.json({
      success: true,
      payload: family,
    });
  }
);

router.post(
  "/",
  body("family_name").isString(),
  async function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const family = await createFamily(req.body.family_name);

    res.json({
      success: true,
      payload: family,
    });
  }
);

router.get(
  "/users/:family_id",
  param("family_id").isInt(),
  async function (req, res) {
    const familyId = Number(req.params.family_id);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const users = await getUsersByFamilyId(familyId);

    res.json({
      success: true,
      payload: users,
    });
  }
);

router.get(
  "/children/:family_id",
  param("family_id").isInt(),
  async function (req, res) {
    const familyId = Number(req.params.family_id);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const children = await getChildrenByFamilyId(familyId);

    res.json({
      success: true,
      payload: children,
    });
  }
);

export default router;
