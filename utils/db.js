// File: utils/db.js
import { MongoClient } from "mongodb";

const connectionString = "mongodb://localhost:27017";
export const client = new MongoClient(connectionString);

const dbname = "skillcheck-practics";
export const db = client.db(dbname);
