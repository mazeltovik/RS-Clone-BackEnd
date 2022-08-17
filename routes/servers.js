import { Router } from "express";
import { getAll, createUser, getUser } from "../services/services.js";
const router = Router();

router.get('/api/server',getAll)
router.get('/api/server/:id',getUser)
router.post('/api/server',createUser)
export default router;