import db from "../database/database.connection.js";

/*
{
  id: 1,
  name: 'Banco Imobiliário',
  image: 'http://',
  stockTotal: 3,
  pricePerDay: 1500,
}
*/

export async function getGames(req, res){
    try {
        const search=await db.query("SELECT * FROM games");
        return res.send(search.rows);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export async function postGames(req, res){
    const {name, image, stockTotal, pricePerDay}=res.locals.validated;
    try {
        const search=await db.query("SELECT * FROM games WHERE name=$1",[name]);
        if(search.rowCount) return res.status(409).send("Game already exists");
        const createLog=await db.query(`
        INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
        VALUES ($1, $2, $3, $4)`,[name, image, stockTotal, pricePerDay]);
        return res.sendStatus(201);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}