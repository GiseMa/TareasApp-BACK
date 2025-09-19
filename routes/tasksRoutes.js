import { Router } from "express";
import { validateJWT } from "../middlewares/validateJWT.js";
import { createTask, deleteTask, getTasks, updateTask, completeTask} from "../controllers/tasks.js";
import { createValidation, updateValidation, validateFields } from "../middlewares/validateFields.js";

const taskRoutes = Router();

taskRoutes.use(validateJWT);

taskRoutes.get('/', getTasks);

taskRoutes.post('/', createValidation, validateFields, createTask);

taskRoutes.put('/:id', updateValidation, validateFields,updateTask);

taskRoutes.patch('/:id', completeTask);

taskRoutes.delete('/:id', deleteTask);

export default taskRoutes;