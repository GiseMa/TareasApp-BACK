import { validationResult } from "express-validator";
import { check } from "express-validator"
import { isDate } from "../helpers/isDate.js"

export const validateFields = (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        console.error('Validation errors:', errors.array()); 
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    };
    
    next();
} 

export const registerValidation = [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El mail es obligatorio').isEmail(),
    check('password', 'La contrasenia debe tener por lo menos 6 caracteres').isLength({min: 6}),
];

export const loginValidation = [
    check('email', 'El mail es obligatorio').isEmail(),
    check('password', 'La contrasenia debe tener por lo menos 6 caracteres').isLength({min: 6}),
];

export const createValidation = [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('text', 'Las notas son obligatorias').not().isEmpty(),
    check('type', 'Tiene que elegir un tipo').not().isEmpty(),
    check('start').custom(isDate).withMessage('Fecha de inicio invalida - BACK'),
    check('end').custom(isDate).withMessage('Fecha de fin invalida - BACK'),
];

export const updateValidation = [
    check('title', 'El titulo es obligatorio').optional().not().isEmpty(),
    check('text', 'Las notas son obligatorias').optional().not().isEmpty(),
    check('type', 'Tiene que elegir un tipo').optional().not().isEmpty(),
    check('start').optional().custom(isDate).withMessage('Fecha de inicio obligatoria - BACK'),
    check('end').optional().custom(isDate).withMessage('Fecha de finalizacion obligatoria - BACK'),
];
