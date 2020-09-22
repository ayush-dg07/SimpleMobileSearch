const express=require('express');
const path = require('path');
const routes = require('./routes');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/',routes);

port=process.env.PORT || 3000; 
app.listen(port, () => {
    console.log('Server started');
});