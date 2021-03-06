require("dotenv").config();
const express = require("express");
const app = express();
const url = "https://localhost:3000/transactions";
const PORT = process.env.PORT || 3001;
const fetch = require('node-fetch');
//const payementRouter = require('./routes/paiement')
const cors = require('cors');
const bodyParser = require('body-parser') ;

app.use(express.json());
app.use(bodyParser.json());

app.post("/paiement", (req,res) => {
        let url_notif = req.body ;
        setTimeout(function () {
            fetch(url_notif, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.status === 200);
            console.log('Le paiement a été effectué ')
        }, 500)
    }
)
//app.use("/paiement",payementRouter);


app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
