import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.get("/healthy", (req, res) => {
  res.status(200).json({ service: "notification-service" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`notification-service running on port ${PORT}........`);
});
