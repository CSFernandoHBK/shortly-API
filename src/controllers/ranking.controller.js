export async function cauculateRanking(req, res){
    try{
        return res.send("Entrou no ranking")
    } catch(err){
        console.log(err)
        res.status(500).send(err.message);
    }
}