import { Router } from "express";
import { validateJWT } from "../middlewares/validateJWT.js";
import { createTask, deleteTask, getTasks, updateTask, completeTask} from "../controllers/tasks.js";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields.js";
import { isDate } from "../helpers/isDate.js";

const taskRoutes = Router();

taskRoutes.use(validateJWT);

taskRoutes.get('/', getTasks);

taskRoutes.post(
    '/',
    [ 
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('text', 'Las notas son obligatorias').not().isEmpty(),
        check('type', 'Tiene que elegir un tipo').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom(isDate),
        validateFields
    ],
    createTask
);

taskRoutes.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom(isDate),
        validateFields
    ],
    updateTask
);

taskRoutes.patch('/:id', completeTask);

taskRoutes.delete('/:id', deleteTask);


export default taskRoutes;