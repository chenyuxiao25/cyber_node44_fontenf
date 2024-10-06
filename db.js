import mysql from "mysql2/promise"

const pool =mysql.createPool({
   host:"localhost",//dia chi host mysql duoi local,
   user:"root",//ten nguopi diung 
   password:"123456",//mat khau user
   database:"node444",
   port:3307
})

export default pool;
