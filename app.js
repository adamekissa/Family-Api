import express from "express";
import path from "path";

import __dirname from "./dirname.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import { auth } from "express-oauth2-jwt-bearer";

import familiesRouter from "./routes/families.js";
import usersRouter from "./routes/users.js";
import childrenRouter from "./routes/children.js";
import feedsRouter from "./routes/feeds.js";
import nappiesRouter from "./routes/nappies.js";
import sleepsRouter from "./routes/sleeps.js";
import weightsRouter from "./routes/weights.js";
import temperaturesRouter from "./routes/temperatures.js";

const app = express();

const checkJwt = auth({
  audience: 'http://mooborn/',
  issuerBaseURL: `https://redu.eu.auth0.com/`,
});

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/families", checkJwt, familiesRouter);
app.use("/users", checkJwt, usersRouter);
app.use("/children", checkJwt, childrenRouter);
app.use("/feeds", checkJwt, feedsRouter);
app.use("/nappies", checkJwt, nappiesRouter);
app.use("/sleeps", checkJwt, sleepsRouter);
app.use("/weights", checkJwt, weightsRouter);
app.use("/temperatures", checkJwt, temperaturesRouter);

app.use(function (req, res, next) {
  res.status(404).json({ message: "We couldn't find what you were looking for 😞" });
});

app.use(function (err, req, res, next) {
  // console.error(err.stack);
  res.status(500).json(err);
});

export default app;
