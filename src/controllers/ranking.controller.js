import { connectionDB } from "../database/db.js";

export async function cauculateRanking(req, res){
    try{
        const response = await connectionDB.query(`
        SELECT "userId" as "id",
        u.name as "name",
        COUNT("userId") as "linksCount",
        SUM(clicks) as "visitCount" 
        FROM links l
        JOIN users u ON u."id"=l."userId"
        GROUP BY "userId", u."id"
        ORDER BY "visitCount" DESC
        LIMIT 10
        `)

        return res.status(200).send(response.rows);
    } catch(err){
        console.log(err)
        res.status(500).send(err.message);
    }
}