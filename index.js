const express = require('express');
const fetch = require('node-fetch');

//initialize express app
const app = express();

//store fetch request parameters in variables
let url = 'https://api.exchangeratesapi.io/latest';
let settings = { method: 'Get' };



app.get('/api/rates', (req, res) => {
    //fetch json
    fetch(url, settings)
    .then(res => res.json())
    .then( data => {
        //get query parameters
        let queryParams = req.query;
        let base = queryParams.base;
        let currency = queryParams.currency;

        let rateRes = data.rates;

    
        //output
        let output = {
            results: {
                base: base,
                date: new Date().toLocaleDateString(),
                currency: {}
            }
        }

        //split currency query
        let currencyList = currency.split(',');
        
        //loop through query and create currency object
        currencyList.forEach(cur => {
            output.results.currency[`${cur}`] = data.rates[cur]
        })  

        if((base === undefined) || (base === '') || (currency === undefined) || (currency === '')) {
            res.status('400')
            res.json({message: 'not found'})
        } else {
            res.json(output)
        }
        // if(rateRes[`${base}`]) {
        //     res.json(output)
        // } else {
        //     res.status('400')
        //     res.json({message: 'not found'})
        // }
        // res.json(output)
    })  
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`Server started on port ${PORT}...`);})