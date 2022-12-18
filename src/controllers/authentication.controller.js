import { connectionDB } from "../database/db.js";

export async function signin(req, res){}

export async function signup(req, res){}



export async function teste(req, res){
    try{
        return res.send("Tudo ok no controller")
    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}