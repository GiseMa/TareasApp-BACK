import { Router } from "express";
import {loginValidation, registerValidation, validateFields}  from "../middlewares/validateFields.js";
import { createUser, loginUser, renewToken } from "../controllers/auth.js";
import { validateJWT } from "../middlewares/validateJWT.js";

const authRoutes = Router();

authRoutes.post('/register', registerValidation, validateFields, createUser);

authRoutes.post('/login', loginValidation, validateFields, loginUser);

authRoutes.get('/renew', validateJWT, renewToken);

export default authRoutes;