const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const doctorSchema= new Schema({
    name:{
        type:String,
        required:true,
    },

    department:{
        
           type:String
         
    
},
speciality:{
    type:String,
    required:true
},
mobile:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
hospitals:{
    type:String,
    required:true
},
languages:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true,
},
status:{
    type:Boolean,
    default:true
}


})
module.exports=mongoose.model('doctor',doctorSchema)
