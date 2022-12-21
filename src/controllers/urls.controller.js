import { connectionDB } from "../database/db.js";
import { nanoid } from 'nanoid';

export async function linkGenerator(req, res){
    console.log("entrou aqui");

    try{
        return res.send(req.body)
    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
} 