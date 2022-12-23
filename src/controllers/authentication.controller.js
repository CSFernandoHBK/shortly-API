import { connectionDB } from "../database/db.js";
import bcrypt from "bcrypt";
import userRegisterSchema from "../models/Authentication.js";
import { v4 as uuidV4} from "uuid";


export async function signin(req, res){
    const {email, password} = req.body;
    const token = uuidV4();

    try{
        const user = await connectionDB.query(`
        SELECT * FROM users WHERE email = $1
        `, [email]);
        if(user.rows.length === 0){
            return res.sendStatus(404);
        };
        
        const isPasswordOk = bcrypt.compareSync(password, user.rows[0].password);

        if(!isPasswordOk){
            return res.sendStatus(401);
        }

        await connectionDB.query(`
            INSERT INTO sessions (token, "userId") VALUES ($1, $2)
        `, [token, user.rows[0].id]);

        return res.status(200).send(token);
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
        SELECT * FROM users WHERE email = $1
        `, [email]);
        if(userExists.rows.length !== 0){
            return res.sendStatus(409);
        }
        await connectionDB.query(`
        INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
        `, [name, email, passwordHash]);
        return res.sendStatus(201);
    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}

