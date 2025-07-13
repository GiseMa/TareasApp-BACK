import { Router } from "express";
import authRoutes from './authRoutes.js';
import taskRouter from './tasksRoutes.js';
import { getFilters } from "../controllers/filters.js";


const router = Router();
router.use('/auth', authRoutes);
router.use('/tasks', taskRouter);
router.get('/filters', getFilters);

export default router;

