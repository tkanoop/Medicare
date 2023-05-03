const blockClient = async(req,res,next) =>{
    const Client = require('../models/client')

    const block = async ()=>{
        await Client.find()
        if(Client.status==true){
            next()

        }else{

        }
       
    }


}
module.exports = blockClient;