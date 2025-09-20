import { Router } from "express";
import { validateJWT } from "../middlewares/validateJWT.js";
import { createTask, deleteTask, getTasks, updateTask, completeTask} from "../controllers/tasks.js";
import { createValidation, updateValidation, validateFields } from "../middlewares/validateFields.js";
import { getFilters } from "../controllers/filters.js";


const taskRoutes = Router();

//taskRoutes.use(validateJWT);

taskRoutes.get('/', validateJWT,  getTasks);

taskRoutes.post('/', validateJWT, createValidation, validateFields, createTask);

taskRoutes.put('/:id', validateJWT, updateValidation, validateFields, updateTask);

taskRoutes.patch('/:id', validateJWT, completeTask);

taskRoutes.delete('/:id', validateJWT, deleteTask);

taskRoutes.get('/filters', getFilters);

export default taskRoutes;
