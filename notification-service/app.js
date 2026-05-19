import express from "express";
import notificationRouter from "./src/api/routes/notificationRoutes.js";


const app = express();

app.use(express.json());
app.use("/api/notification", notificationRouter);


export default app;
