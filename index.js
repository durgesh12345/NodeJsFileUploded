const express = require('express');
var mongoose = require('mongoose');
const multer  = require('multer');
const path = require('path');
const csvModel = require('./models/mongodb');
var csv = require('csvtojson');  
var bodyParser = require('body-parser');
const db = require('./config/moongose');
var port = 8000;
var app = express();


app.use(express.static(__dirname+ '/assets'));

// multer functions
var storage  = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb) => {
        cb(null,file.originalname);
    } 
});

var uploads = multer({storage:storage});

  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

//   get Api main page
  app.get('/', (req, res) => {
    csvModel.find((err,data)=>{
        if(err){
            console.log(err);
        }else{
            if(data != ''){
                res.render('index', { data: data });
            }else{
                res.render('index', { data: '' });
            }
        }
    })
  })

//   uploded Api to upload csv files
  app.post('/',uploads.single('file'),(req, res) =>{
   csv()
   .fromFile(req.file.path)
   .then((jsonobj) =>{
           console.log(jsonobj);
           csvModel.insertMany(jsonobj,(err, data) => {
            if(err){
                console.log("this is err during insert"+err);
            }else{
                // console.log("this is ok"+data);
                res.redirect('/');
            }
                 })
  })
 });

//  server to listen the request
app.listen(port,function(err) {
if (err) {
    console.log("Error listening");
}
console.log("Connected to port " + port);

});