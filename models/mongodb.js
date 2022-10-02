var mongoose  =  require('mongoose');  
   
// schema object
var csvSchema = new mongoose.Schema({  
    Batch:{  
        type:String  
    },  
    age:{  
        type:String  
    },  
    SAPID:{  
        type:String  
    },  
    Date:{  
        type:String  
    },  
    
      
});  
   
const Csv = mongoose.model('Csv',csvSchema);

module.exports = Csv;