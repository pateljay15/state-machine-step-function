const express = require("express")
const cors = require("cors")
const mysql = require('mysql2')

const app = express()

app.use(
    cors({
      origin: "*",
    })
  );
  
app.use(express.json());

const connection = mysql.createConnection({
    host     : 'a2-database.crestczbip3d.us-east-1.rds.amazonaws.com',
    user     : 'admin',
    password : 'jay12345',
    database: "a2database"
});
   
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);

    let sql = 'CREATE TABLE IF NOT EXISTS `products` ( name varchar(100), price varchar(100), availability boolean)';

    connection.execute(sql, (err, result, fields) => {
        if (err instanceof Error) {
            console.log(err);
            return
        }
        console.log("table created")
    });
});



app.post("/store-products", (req, res) => {
    let products = req.body.products
    let prepReqSqlArr = []
    let sql = 'INSERT INTO `products`(`name`, `price`, `availability`) VALUES ';

    if (products.length == 0) {
        return res.status(400).json({
            error: "No products recieved"
        })
    }  

    products.forEach(product => {
        prepReqSqlArr.push(product.name)
        prepReqSqlArr.push(product.price)
        prepReqSqlArr.push(product.availability)
        sql = sql + ' (?,?,?),'
    });

    sql = sql.slice(0, sql.length-1)


    connection.execute(sql, prepReqSqlArr, (err, result, fields) => {
        if (err instanceof Error) {
            console.log(err);
            return res.status(200).json({
                error: "Failed. Error occured while storing products in DB"
            })
        }

        return res.status(200).json({
            message: "Success."
        })
    });
});
  
  
app.get("/list-products", (req, res) => {

    let sql = 'SELECT * FROM `products`';

    connection.execute(sql, (err, result, fields) => {
        if (err instanceof Error) {
            console.log(err);
            return res.status(200).json({
                error: "Failed. Error occured while Fetching products from DB"
            })
        }

        result.forEach(row => {
            row.availability = Boolean(row.availability);
        });

        return res.status(200).json({
            products: result
        })
        
    });
});


app.listen(6000, () => {
    console.log("server listening on port 6000");
});
