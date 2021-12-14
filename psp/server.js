require("dotenv").config();
const express = require("express");
const app = express();
const url = "https://localhost:3000/transactions";
const PORT = process.env.PORT || 3002;
const fetch = require("node-fetch");

app.post("/paiement", (res, req) => {
  setTimeout(function () {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.status === 200);
    console.log("Le paiement a été effectué ");
  }, 500);
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
