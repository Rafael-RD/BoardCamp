import db from "../database/database.connection.js";

/*
{
  id: 1,
  customerId: 1,
  gameId: 1,
  rentDate: '2021-06-20',    // data em que o aluguel foi feito
  daysRented: 3,             // por quantos dias o cliente agendou o aluguel
  returnDate: null,          // data que o cliente devolveu o jogo (null enquanto não devolvido)
  originalPrice: 4500,       // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
  delayFee: null             // multa total paga por atraso (dias que passaram do prazo vezes o preço por dia do jogo)
}
*/

export async function getRentals(req, res) {
    try {
        const search = await db.query(`
            SELECT rentals.*, games.name AS "gameName", customers.name AS "customerName"
            FROM rentals
            JOIN customers ON rentals."customerId"=customers.id
            JOIN games ON rentals."gameId"=games.id`);
        const result=search.rows?.map(e=>{
            e.customer={id: e.customerId,name: e.customerName};
            e.game={id: e.gameId,name: e.gameName};
            delete e.customerName;
            delete e.gameName;
            return e;
        })
        
        return res.send(search.rows);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export async function postRentals(req, res){
    const {customerId, gameId, daysRented}=res.locals.validated;

    try {
        const searchCustomer=await db.query("SELECT * FROM customers WHERE id=$1",[customerId]);
        if(searchCustomer.rowCount===0) return res.sendStatus(400);
        const searchGame=await db.query("SELECT * FROM games WHERE id=$1",[gameId]);
        if(searchGame.rowCount===0) return res.sendStatus(400);
        const searchRentals=await db.query(`SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL`,[gameId]);
        if(searchGame.rows[0].stockTotal-searchRentals.rowCount<=0) return res.sendStatus(400);
        if(searchRentals.rows.some(e=>e.customerId===customerId)) return res.sendStatus(400);

        
        const createLog=await db.query(`
        INSERT INTO rentals 
        ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
        [customerId, gameId, (new Date()).toISOString(), 
        daysRented, null, daysRented*searchGame.rows[0].pricePerDay, null]);

        return res.sendStatus(201);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export async function postReturnRentals(req, res){
    const {id}=req.params;
    if(id<=0) return res.sendStatus(404);
    try {
        const search=await db.query("SELECT * FROM rentals WHERE id=$1", [id]);
        if(search.rowCount===0) return res.sendStatus(404);
        if(search.rows[0].returnDate!==null) return res.sendStatus(400);
        const returned=new Date();
        const fee=Math.floor((returned-(new Date(search.rows[0].rentDate)))/(1000*3600*24))*search.rows[0].originalPrice;

        const updLog=await db.query(`
        UPDATE rentals 
        SET "returnDate"=$1, "delayFee"=$2
        WHERE id=$3`, [returned.toISOString(), fee, id]);

        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export async function deleteRentals(req, res){
    const {id}=req.params;
    if(id<=0) return res.sendStatus(404);
    try {
        const search=await db.query("SELECT * FROM rentals WHERE id=$1",[id]);
        if(search.rowCount===0) return res.sendStatus(404);
        if(search.rows[0].returnDate === null) return res.sendStatus(400);
        const deleteLog=await db.query("DELETE FROM rentals WHERE id=$1",[id]);
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}