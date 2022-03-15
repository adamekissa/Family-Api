import express from "express";
import { body, param, validationResult } from "express-validator";
import { getAllUsers, getUserById, getUserByEmail, createUser } from "../models/users.js";

const router = express.Router();

router.get("/", async function (req, res) {
  const users = await getAllUsers();

  if (users === []) {
    res.json({
      success: true,
      payload: "No users to display :(",
    });
  }

  res.json({
    success: true,
    payload: users,
  });
});

router.get("/:user_id", param("user_id").isInt(), async function (req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await getUserById(Number(req.params.user_id));

  res.json({
    success: true,
    payload: user,
  });
});

router.get("/email/:user_email", param("user_email").isEmail(), async function (req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await getUserByEmail(req.params.user_email);

  res.json({
    success: true,
    payload: user,
  });
});

router.post(
  "/",
  body("user_name").isLength({ min: 5 }),
  body("user_email").isEmail(),
  body("user_role").isString(),
  body("family_id").isInt(),
  async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await createUser(req.body);
      res.json({
        success: true,
        payload: user,
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
