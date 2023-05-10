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
        const games=await db.query("SELECT * FROM games");
        res.send(games.rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

// export async function postGames(req, res){

//     try {
        
//     } catch (error) {
//         console.error(error);
//         res.sendStatus(500);
//     }
// }