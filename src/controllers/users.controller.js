import { connectionDB } from "../database/db.js";

export async function getInfoUser(req, res){
    const {authorization} = req.headers;
    if(!authorization){
        return res.sendStatus(401);
    }

    try{
        const token = authorization?.replace("Bearer ", "")
        if(!token || token === "Bearer"){
            return res.sendStatus(401);
        }

        const session = await connectionDB.query(`
            SELECT * FROM sessions WHERE token = $1
        `, [token]);

        if(!session.rows[0]){
            return res.sendStatus(401);
        };

        const userId = session.rows[0].userId;

        const name = await connectionDB.query(`
            SELECT name FROM users WHERE id = $1
        `, [userId]);

        const userName = name.rows[0].name;

        const urls = await connectionDB.query(`
            SELECT * FROM links WHERE "userId" = $1
        `, [userId]);

        const userUrls = urls.rows.map((u) => ({
            "id": `${u.id}`,
            "shortUrl": `${u.compactLink}`,
            "url":`${u.completeLink}`,
            "visitCount":`${u.clicks}`
        }));

        let visitCount = 0;

        userUrls.forEach((a) => {visitCount = visitCount + parseInt(a.visitCount)})

        const response = {
            "id": `${userId}`,
            "name": `${userName}`,
            "visitCount": `${visitCount}`,
            "shortenedUrls": userUrls
        }

        return res.status(200).send(response);
    } catch(err){
        console.log(err);
        res.status(500).send(err.message);
    }
}