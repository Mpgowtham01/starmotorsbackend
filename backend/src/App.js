import express, { json } from "express";
import cors from "cors";
import signup from "../src/Router/Router.js";
import bike from "../src/Router/BikeListrouter.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  json({
    limit: "25MB",
  })
);

app.use("/signup", signup);
app.use("/bike", bike);
export default app;
