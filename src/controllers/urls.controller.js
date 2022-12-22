import { connectionDB } from "../database/db.js";
import { nanoid } from 'nanoid';

export async function linkGenerator(req, res){
    const {authorization} = req.headers;
    const completeUrl = req.body.url;

    if(!authorization){
        return res.sendStatus(401);
    }

    if(!completeUrl){
        return res.sendStatus(400);
    }

    try{
        const token = authorization?.replace("Bearer ", "")
        if(!token || token === "Bearer"){
            return res.sendStatus(401);
        }

        const session = await connectionDB.query(`
        SELECT * FROM sessions WHERE token = '${token}'
        `);

        if(!session.rows[0]){
            return res.sendStatus(401);
        };

        const {userId} = session.rows[0];

        const compactUrl = nanoid(8);

        await connectionDB.query(`
            INSERT INTO links ("userId", "completeLink", "compactLink", "clicks")
            VALUES ('${userId}', '${completeUrl}', '${compactUrl}', '0')
        `)

        return res.send({"shortUrl": `${compactUrl}`});
    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}

export async function getUrl(req, res){
    const { id } = req.params;

    if(!id){
        return res.sendStatus(400);
    }

    try{
        const urlData = await connectionDB.query(`
            SELECT * from links WHERE id = ${id}
        `)

        if(!urlData.rows[0]){
            return res.sendStatus(404);
        }

        const { completeLink, compactLink} = urlData.rows[0];

        return res.send({
            "id": `${urlData.rows[0].id}`,
            "shortUrl": `${compactLink}`,
            "url": `${completeLink}`
        });
    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}

export async function redirectToUrl(req, res){
    const {shortUrl} = req.params;

    if(!shortUrl){
        return res.sendStatus(400);
    }

    try{
        const urlData = await connectionDB.query(`
            SELECT * FROM links WHERE "compactLink" = '${shortUrl}'
        `)

        if(!urlData.rows[0]){
            return res.sendStatus(404);
        }
        const {completeLink, clicks} = urlData.rows[0];

        await connectionDB.query(`
            UPDATE links SET clicks=${clicks + 1} WHERE "compactLink" = '${shortUrl}'
        `)

        return res.redirect(`${completeLink}`);
    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}

export async function deleteUrl(req, res){
    const {authorization} = req.headers;
    const { id } = req.params;

    if(!id){
        return res.sendStatus(400);
    }

    if(!authorization){
        return res.sendStatus(401);
    }

    try{
        const token = authorization?.replace("Bearer ", "")
        if(!token || token === "Bearer"){
            return res.sendStatus(401);
        }

        const session = await connectionDB.query(`
            SELECT * FROM sessions WHERE token = '${token}'
        `);
        if(!session.rows[0]){
            return res.sendStatus(401);
        };

        const urlInfo = await connectionDB.query(`
            SELECT * FROM links WHERE id = '${id}'
        `)
        if(urlInfo.rows.length === 0){
            return res.sendStatus(404);
        }

        if(urlInfo.rows[0].userId !== session.rows[0].userId){
            return res.sendStatus(401)
        }

        await connectionDB.query(`
            DELETE FROM links WHERE id = '${id}'
        `)

        return res.sendStatus(204);
    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}

