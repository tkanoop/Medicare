
const requireAuth = async(req,res,next) =>{
 const jwt = require('jsonwebtoken')
 const Client = require('../models/client')
    // 
    // verify authentication
    const {authorization} =req.headers
    console.log('dfggdfdsfg' + authorization);
    if(!authorization){
        return res.status(401).json({error: "Authorization token required"})
    }
    const token = authorization
    console.log(token);

    try {
      const {_id} = jwt.verify(token,process.env.SECRET)
      const client= await  Client.find({_id})
      
      if(req.client=client){
       

        
        next()
        

      }else{
        res.status(201).json({message:true})
      }
      
    } catch (error) {
        console.log(error);
        res.status(401).json({error:'Request is not authorized'})
    }

}
module.exports = requireAuth;