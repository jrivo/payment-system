require("dotenv").config();
console.log(process.env)
const Scrapper = require("./utils/Scrapper");
const Buffer = require("buffer");
const CurrencyModel = require("./models/mongo/currency");
const connection = require("./lib/mongo");
const {Promise} = require("mongoose");

// Exchange Rates API
new Scrapper({
    url: "http://api.exchangeratesapi.io/v1/latest",
    query: {
        access_key: process.env.SCRAPPER_CURRENCY_API_KEY,
        symbols: "USD,EUR,GBP,CNY,RUB"
    },

    // Recupere Date, device de départ, device d'arrivé et le taux de change
    processData: (data) =>
        Object.entries(data.rates).map((item) => ({
            _id: data.timestamp+data.base+item[0],
            date: data.date,
            currencyFrom: data.base,
            currencyTo: item[0],
            rate: item[1]
        })),
})
    .getData()
    // Insertion pour chaque Currency si pas éxistant
    .then((data) => Promise.all(
        data.map(item=> CurrencyModel.findOneAndUpdate({_id: item._id}, item, {upsert:true, overwrite: true, new: true}))
    ))
    .then(console.log)
    .finally(() => connection.close());


