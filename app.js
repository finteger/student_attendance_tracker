const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
require('dotenv').config();

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(PORT, () =>{
    console.log(`Connected on port ${PORT}`);
});