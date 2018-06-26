const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Re-Spec\'d!'));

app.listen(process.env.PORT || 3000, 
    () => console.log('listening on 3000!'));
    //
