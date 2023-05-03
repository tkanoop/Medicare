
const requireAuth = async(req,res,next) =>{
    const jwt = require('jsonwebtoken')
    const Client = require('../models/client')
       // 
       // verify authentication
       const {authorization} =req.headers
       console.log('dfggdfdsfg' + authorization);
       if(!authorization){
           return res.status(401).json({message: "Authorization token required",tokenverified:false})
       }
       const token = authorization
       console.log(token);
   
       try {
         const {err,decoded} = jwt.verify(token,process.env.SECRET)
         if(decoded){
           
   
           const client= await  Client.findOne({_id:decoded._id})
           if(client.blocked===false){
             
             next()
   
           }else{
             res.json({tokenverified:true,statusverified:false})
           }
   
         }else if(err){
           res.json({tokenverified:false})
         }
        
       } catch (error) {
           console.log(error);
           res.status(401).json({error:'Request is not authorized'})
       }
   
   }
   module.exports = requireAuth;