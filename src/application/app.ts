import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import { audienceFilterOptionsRouter } from "./api/http-rest/routes/audience-filter-options";

const app = express();

app.use(json());
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// get all options for audience query builder filter from an account
app.use(audienceFilterOptionsRouter);

app.all("*", (req, res) => {
  return res.status(404).send({ message: "route not found" });
});

export { app };
