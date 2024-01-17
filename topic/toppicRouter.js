import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const topicRouter = Router();
const topicCollection = db.collection("skillcheckpoint"); //เอาไว้ดึง data

topicRouter.get("/", async (req, res) => {
  try {
    const results = await topicCollection.find({}).toArray();
    if (results.length === 0) {
      return res.status(500).json({
        message: "Can't find topic",
      });
    }
    return res.status(200).json({
      message: "Fetching Successfully",
      data: results,
    });
  } catch {
    return res.status(400).json({
      message: "Invalid request, can't find topic",
    });
  }
});

topicRouter.get("/:skillcheckpointid", async (req, res) => {
  const topicid = new ObjectId(req.params.skillcheckpointid);

  try {
    const results = await topicCollection.find({ _id: topicid }).toArray();
    if (results.length === 0) {
      return res.status(400).json({
        message: "invalid request,can't find topic",
      });
    } else {
      return res.status(200).json({
        message: "Fetching Successfully",
        data: results[0],
      });
    }
  } catch {
    return res.sendStatus(500).json({
      message: "server error",
    });
  }
});

topicRouter.post("/", async (req, res) => {
  const date = new Date();
  const newTopic = { ...req.body, creted_date: date };
  if (
    !newTopic.header_text ||
    !newTopic.description ||
    !newTopic.category ||
    !newTopic.category[0]
  ) {
    return res.status(200).json({
      message: "invalid request,Missing body",
    });
  }
  try {
    const results = await topicCollection.insertOne(newTopic);
    return res.status(200).json({
      message: "record topic complete",
    });
  } catch {
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

topicRouter.put("/:skillcheckpointid", async (req, res) => {
  const id = new ObjectId(req.params.skillcheckpointid);
  const lastUpdataAdd = new Date();
  const updateTopic = { ...req.body, lastUpdataAdd };
  try {
    const results = await topicCollection.updateOne(
      { _id: id },
      { $set: updateTopic }
    );
    return res.status(200).json({
      message: "update successfully",
    });
  } catch {
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

topicRouter.delete("/:skillcheckpointid", async (req, res) => {
  const id = new ObjectId(req.params.skillcheckpointid); // แก้ชื่อ parameter เป็น skillcheckpointid
  try {
    const results = await topicCollection.deleteOne({ _id: id });
    if (results.deletedCount === 0) {
      // แก้ deleteCount เป็น deletedCount
      return res.status(400).json({
        message: "Can't find id",
      });
    } else {
      await topicCollection.deleteOne({ _id: id });
      return res.status(200).json({
        message: "Delete Successfully",
      });
    }
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
});

export default topicRouter;
