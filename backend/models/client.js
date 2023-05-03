const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = Schema({
    name:{
        type: String,
        required: true,
 
    },
   
    age:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type:String,
        required:true

    },
    mobile:{
        type: String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    
    password:{
        type: String,
        
    },
    status:{
        type:Boolean,
        default:true,
        
    }

})

module.exports = mongoose.model('Client',clientSchema)
