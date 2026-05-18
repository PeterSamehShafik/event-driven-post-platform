import { Router } from "express";
import PostController from "../controllers/PostController.js";

const router = Router();

router.post("/", PostController.create);
router.get("/", PostController.list);
router.get("/:id", PostController.getById);

export default router;
