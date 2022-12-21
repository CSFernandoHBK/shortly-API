import { connectionDB } from "../database/db.js";
import bcrypt from "bcrypt";
import userRegisterSchema from "../models/Authentication.js";

export async function signin(req, res){}

export async function signup(req, res){
    const user = req.body;

    const {error} = userRegisterSchema.validate(user, {abortEarly: false});

    if (error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    const passwordHash = bcrypt.hashSync(user.password, 10);

    try{
        const userExists = await connectionDB.query()
        if(userExists){
            return res.sendStatus(409);
        }

    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}



export async function teste(req, res){
    try{
        return res.send("Tudo ok no controller")
    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}