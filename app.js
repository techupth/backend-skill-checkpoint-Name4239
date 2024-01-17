import express from "express";
import { client } from "./utils/db.js"; //อย่าลืม ใส่ js
import cors from "cors";
import bodyParser from "body-parser";
import topicRouter from "./topic/toppicRouter.js"; //อย่าลืม ใส่ js

async function init() {
  const app = express();
  const port = 99;

  try {
    await client.connect();
    console.log(`Connected to Database successfully`);
  } catch (error) {
    console.error(`Database connection error ${error}`);
  }

  app.use(cors());
  app.use(bodyParser.json());
  app.use("/skillcheckpoint", topicRouter);
  //เอาไว้กำหนด พาทอย่างลืม 

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
