const express = require('express');
const app = express();
const pg = require('pg');

app.get('/', (req, res) => res.send('<h1><marquee>Re-Spec\'d!</marquee></h1>'));

app.listen(process.env.PORT || 3000, 
    () => console.log('listening on 3000!'));
