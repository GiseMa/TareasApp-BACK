import { validationResult } from "express-validator";
import { check } from "express-validator"
import { isDate } from "util/types";

export const validateFields = (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
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
    check('start', 'Fecha de inicio obligatoria').custom(isDate),
];

export const updateValidation = [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom(isDate),

];
