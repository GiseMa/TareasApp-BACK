import { response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";  
import {generateJWT} from "../helpers/jwt.js";

const createUser = async(req, res = response) => {

    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({email});

        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        };
        
        user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error creando el usuario - BACK'
        })
    };
};

const loginUser = async(req, res = response) => {

    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if(user) {
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword){
                return res.status(401).json({
                    ok: false,
                    msg: 'Email y/o contraseña incorrectos'
                })
            } else {
                const token = await generateJWT(user.id, user.name);

                res.json({
                    ok: true,
                    uid: user.id,
                    name: user.name,
                    token
                })
            }
        } else {
            return res.status(401).json({
                ok: false,
                msg: 'Email y/o contraseña incorrectos'
            })
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error logueando al usuario - BACK'
        })
    }
}

const renewToken = async(req, res = response) => {

    const {uid, name} = req;

    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name: name,
        token
    })
};

export {createUser, loginUser, renewToken};