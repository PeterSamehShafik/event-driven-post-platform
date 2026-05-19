import { Router } from "express";
import NotificationController from "../controllers/NotificationController.js"

const router = Router()

router.get('/healthy', NotificationController.health)

export default router