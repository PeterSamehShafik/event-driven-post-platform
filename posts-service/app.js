import express from "express";
import postRouter from "./src/api/routes/postRoutes.js";
import notFoundHandler from "./src/api/middlewares/notFoundHandler.js";
import errorHandler from "./src/api/middlewares/errrorHandler.js";

// app
const app = express();

//middleware

app.use(express.json());

//routes
app.use('/api/posts',postRouter);

//Error handling
app.use(notFoundHandler)
app.use(errorHandler)

export default app;
