import { connectionDB } from "../database/db.js";
import bcrypt from "bcrypt";
import userRegisterSchema from "../models/Authentication.js";
import { v4 as uuidV4} from "uuid";


export async function signin(req, res){
    const {email, password} = req.body;
    const token = uuidV4();

    try{
        const user = await connectionDB.query(`
        SELECT * FROM users WHERE email = '${email}'
        `);
        /*if(userExists){
            return res.sendStatus(409);
        }
        await connectionDB.query(`
        
        `);
        return res.sendStatus(201);*/
        return res.send(user.rows);
    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }

}

export async function signup(req, res){
    const {name, email, password} = req.body;

    const {error} = userRegisterSchema.validate(req.body, {abortEarly: false});

    if (error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    try{
        const userExists = await connectionDB.query(`
        SELECT * FROM users WHERE email = '${email}'
        `);
        if(userExists){
            return res.sendStatus(409);
        }
        await connectionDB.query(`
        INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${passwordHash}');
        `);
        return res.sendStatus(201);
    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}

