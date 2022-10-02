const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/csv91');
const db = mongoose.connection;

db.on('error',function(err) {
    console.error.bind(console, err);
});

db.once('open',function() {
  console.log('open Database'); 
})  

module.exports = db;