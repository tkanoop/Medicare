const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = Schema({
    department:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    status: {
        type: Boolean,
        default: true,
      },

});
module.exports = mongoose.model('Department',clientSchema)