import { App } from "./app";
import { ConnectMongo } from "./config/database";
import dotenv from "dotenv";

dotenv.config();

const app = new App();
const database = new ConnectMongo();

database.connectDB();

const port = process.env.PORT || 3000; 

app
  .getApp()
  .listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
  })
  .on("error", (err) => {
    console.error("Error starting the server:", err);
  });
