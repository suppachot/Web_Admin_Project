// ///--------------test import file csv//
// import express from 'express';
// import cors from 'cors';
// import mysql from 'mysql2/promise';
// import csv from 'csv-parser'

// const PORT = 5000

// const app = express();

// app.use(express.json());
// app.use(cors())


// app.post('/api/uploadcsv', async (req, res) => {
//     const { file } = req.files;
//     const results = [];
//     try {
//         const connection = await mysql.createConnection({
//             host: "localhost",
//             user: "root",
//             password: "admin",
//             database: "databaseproject"
//           });     
    
    
//       fs.createReadStream(file.path)
//         .pipe(csv())
//         .on("data", (data) => results.push(data))
//         .on("end", async () => {
//             const columns = Object.keys(rows[0]).map(column => `\`${column}\` VARCHAR(255)`);
//             const tableName = `${filePath}`;

//             const insertDataSql = `INSERT INTO \`${tableName}\` (${Object.keys(rows[0]).map(column => `\`${column}\``).join(", ")}) VALUES ?`;
//             const data = rows.map(row => Object.values(row));
//             await connection.query(insertDataSql, [data]);
      
//             console.log(`Table "${tableName}" created and data inserted successfully.`);
//         });
//     } catch (error) {
//         console.log(error)
//     }
// })


// app.listen(PORT, () =>{

//     console.log(`Listening to port http://localhost:${PORT}`)
// })