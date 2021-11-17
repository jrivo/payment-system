const Scrapper = require("../utils/scrapper");
const Buffer = require("buffer");

new Scrapper({
    url: "http://api.exchangeratesapi.io/v1/latest",
    options: {
        access_key: "61b6fb201a51ca85a56b084f80d3fbb0"
    },
    query: {
        access_key: "61b6fb201a51ca85a56b084f80d3fbb0",
        symbols: "USD,EUR,GBP,CNY,RUB"
    },

    processData: (data) =>
        Object.entries(data.rates).map((item) => ({
            date: data.date,
            currencyFrom: data.base,
            currencyTo: item[0],
            rate: item[1]
        })),
})
    .getData()
    .then((data) => console.log(data));
