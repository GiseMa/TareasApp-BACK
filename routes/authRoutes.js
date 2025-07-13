import { Router } from "express";
import { check } from "express-validator";
import {validateFields}  from "../middlewares/validateFields.js";
import { createUser, loginUser, renewToken } from "../controllers/auth.js";
import { validateJWT } from "../middlewares/validateJWT.js";

const authRoutes = Router();

authRoutes.post(
    '/register',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El mail es obligatorio').isEmail(),
        check('password', 'La contrasenia debe tener por lo menos 6 caracteres').isLength({min: 6}),
        validateFields
    ],
    createUser
);

authRoutes.post(
    '/login',
    [
        check('email', 'El mail es obligatorio').isEmail(),
        check('password', 'La contrasenia debe tener por lo menos 6 caracteres').isLength({min: 6}),
        validateFields
    ],
    loginUser
);

authRoutes.get('/renew', validateJWT, renewToken);

export default authRoutes;