import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) => {

    const header = req.header('authorization');

    if(!header) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    };

    const token = header.startsWith('Bearer ')
    ? header.slice(7)
    : header;

    try {
        const {uid, name} = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
    next();
};

