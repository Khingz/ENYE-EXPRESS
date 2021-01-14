const express = require('express');
const fetch = require('node-fetch');


const app = express();

let url = 'https://api.exchangeratesapi.io/latest';
let settings = { method: 'Get' };



app.get('/api/rates?base', (req, res) => {
    fetch(url, settings)
    .then(res => res.json())
    .then( data => {
        res.json(data)
        console.log(data);
    })  
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`Server started on port ${PORT}...`);})