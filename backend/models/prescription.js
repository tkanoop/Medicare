const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const prescriptionSchema = Schema({
    bookingid:{
        type:String,
        

    },


  clientName: {
    type: String,
   
  },
  doctorName: {
    type: String,
    
  },
  
  date: {
    type: String,
    required: true,
  },
  starting_time: {
    type: String,
    
   
  },
  disease:{
    type:String,
    required:true
  },
  medicine:{
    type:String,
    required:true
  }

 
});
module.exports = mongoose.model("Prescription", prescriptionSchema);
