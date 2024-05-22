const express = require("express")
const cors = require("cors")
const csv = require('csv-parser')
const fs = require("fs");

const app = express()

app.use(
    cors({
      origin: "*",
    })
  );
  
app.use(express.json());

app.post("/micro-sum", (req, res) => {
    let sum = 0
    let products = []
    try {

        fs.createReadStream('/files/'+req.body.file)
        .pipe(csv({ separator: ',',  strict: true}))
        .on('data', (data) => products.push(data))
        .on('end', () => {
            for (let proObj of products) {

                if (proObj.product.trim().toLowerCase() == req.body.product.trim().toLowerCase()) {
                    sum = sum + parseInt(proObj.amount.trim())
                }
            }
                
            res.status(200).json({
                file: req.body.file,
                sum: sum
            })
        })
        .on('error', () => {
            return res.status(400).json({
                file: req.body.file,
                error: "Input file not in CSV format."
            })
        });

    } catch (error) {
        return res.status(400).json({
            file: req.body.file,
            error: "Input file not in CSV format."
        })
    }
});
  
  
app.listen(6060, () => {
    console.log("server listening on port 6060");
});