import db from "../database/database.connection.js";

/*
{
  id: 1,
  name: 'João Alfredo',
  phone: '21998899222',
  cpf: '01234567890',
  birthday: '1992-10-25'
}
*/

export async function getCustomers(req, res) {
    try {
        const search=await db.query("SELECT * FROM customers");
        return res.send(search.rows.map(e=>({...e, birthday: e.birthday.toISOString().slice(0,10)})));
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export async function getCustomersById(req, res){
    const {id}=req.params;
    if(id<1) return res.sendStatus(404);
    
    try {
        const search=await db.query("SELECT * FROM customers WHERE id=$1",[id]);
        if(search.rowCount===0) return res.sendStatus(404);
        return res.send({...search.rows[0], birthday: search.rows[0].birthday.toISOString().slice(0,10)});
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export async function postCustomers(req, res){
    const {name, phone, cpf, birthday}=res.locals.validated;
    try {
        const search=await db.query(`SELECT * FROM customers WHERE cpf=$1`,[cpf]);
        if(search.rowCount) return res.status(409).send("Customer already registered");
        const creteLog=await db.query(`
        INSERT INTO customers (name, phone, cpf, birthday) 
        VALUES ($1, $2, $3, $4)`,[name, phone, cpf, birthday]);
        return res.sendStatus(201);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export async function putCustomers(req, res){
    const {name, phone, cpf, birthday}=res.locals.validated;
    const {id}=req.params;
    if(id<1) return res.sendStatus(404);

    try {
        const searchId=await db.query("SELECT * FROM customers WHERE id=$1",[id]);
        if(searchId.rowCount===0) return res.sendStatus(404);
        const searchCpf=await db.query("SELECT * FROM customers WHERE cpf=$1 AND id!=$2",[cpf, id]);
        if(searchCpf.rowCount) return res.status(409).send("cpf already registered");
        const updLog=await db.query(`
        UPDATE customers 
        SET name=$1, phone=$2, cpf=$3, birthday=$4
        WHERE id=$5`,[name, phone, cpf, birthday, id]);

        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}