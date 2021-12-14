require("dotenv").config();
const express = require("express");
const app = express() ;
const PORT = process.env.PORT || 3001;
const fetch = require('node-fetch');
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/paiement", (req,res) => {
        let notificationUrl = req.body.notificationUrl
        setTimeout(function () {
            fetch(notificationUrl, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.status === 200);
            console.log('Le paiement a été effectué ')
        }, 500)
    }
)

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})