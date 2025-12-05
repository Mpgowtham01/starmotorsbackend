import express, { json } from "express";
import cors from "cors";
import signup from "../src/Router/Router.js";

const app = express();

app.use(cors());

app.use(
  json({
    limit: "25MB",
  })
);

app.use("/signup", signup);
export default app;
