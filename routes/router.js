import { Router } from "express";
import authRoutes from './authRoutes.js';
import taskRouter from './tasksRoutes.js';


const router = Router();
router.use('/auth', authRoutes);
router.use('/tasks', taskRouter);

export default router;

