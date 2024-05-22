const express = require("express")
const cors = require("cors")
const fs = require("fs");
const axios = require("axios")

const app = express()

app.use(
    cors({
      origin: "*",
    })
  );
  
app.use(express.json());
  
app.post("/calculate", (req, res) => {

    if (!req.body.file) {
        return res.status(400).json({
            file: null,
            error: "Invalid JSON input."
        })
    }

    if (fs.existsSync("/files/"+req.body.file)) {
    } else {
        return res.status(400).json({
            file: req.body.file,
            error: "File not found."
        })
    }
    
    axios.post("http://micro-service-second:6060/micro-sum",{ 
        file: req.body.file,
        product: req.body.product
    }).then(response => {
        return res.send(response.data)
    }).catch(err => {
        console.log(err)
        return res.status(400).json(err?.response?.data || err)
    })
});
  
  
app.listen(6000, () => {
    console.log("server listening on port 6000");
});
