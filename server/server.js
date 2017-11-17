const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
var fileUpload = require('express-fileupload');
const config = require('../config/secret');
var template = require('../server/template');
var upload = require('../server/upload.js');
var app = express();

var port = process.env.port || 3000;


mongoose.connect(config.database, function(err){
    if(err) console.log(err);
    console.log('Connected to DB');
})




var server = require('http').Server(app);
 
app.use(fileUpload());
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan('dev'));
 

app.get('/template', template.get);

app.get('/', function (req, res) {
  res.render('main/home', {title: 'Home'});
});

app.post('/', upload.post);

server.listen(port, (err, results)=> {
    console.log("Server Running On PORT 3000");
});