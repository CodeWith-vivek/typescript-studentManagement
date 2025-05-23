import mongoose from "mongoose";

export class ConnectMongo {
  private databaseUrl: string;

  constructor() {
      const dbUrl = process.env.DB_URL;
    if (!dbUrl) {
      throw new Error("DB_URL environment variable is missing");
    }
    this.databaseUrl = dbUrl;
  }

  connectDB() {
    mongoose
      .connect(this.databaseUrl)
      .then(() => console.log("Database connected successfully"))
      .catch((err) => {
        console.error("Database connection error:", err);
        throw err;
      });
  }
}
