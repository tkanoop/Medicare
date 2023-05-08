const Doctor = require("../../models/doctor");
const Booking = require("../../models/booking")
const Client = require("../../models/client")
const mailer = require("../../config/mailer");
const Prescription = require("../../models/prescription")
const jwt=require("jsonwebtoken")
const bcrypt = require("bcrypt");
const createToken = (_id) => {
  return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

module.exports = {
  doctorLogin: async (req, res) => {
    try {
      const data=req.body
      const doctorExist =await Doctor .findOne({email:req.body.email})
      if(doctorExist){
        const passwordMatch = await bcrypt.compare(
          data.password,
         doctorExist.password
        );
        if(doctorExist.email==req.body.email&& passwordMatch == true){
          const token=createToken(doctorExist._id)
          const id=doctorExist._id
          console.log(token)
          res.status(201).json({token})

        }else{
          res.json({fail:"invalid Credentials"})
        }

      }else{
        res.json({message:"You are not registered here"})
      }
      
    } catch (error) {
      
    }
  },
  singleDoctor: async (req, res) => {
    try {

      const {authorization} =req.headers
      console.log(authorization);
            const token=authorization
            const {_id} = jwt.verify(token,process.env.SECRET)
            console.log("sadfsfdsa"+_id);
      const doctor = await Doctor.findById(_id)
      res.status(200).json(doctor)
    } catch (error) {
      console.log(error);
    }
  },
  changePassword: async (req, res) => {
    try {
      console.log("hiii");
      const {authorization} =req.headers
     
            const token=authorization
            const {_id} = jwt.verify(token,process.env.SECRET)
            
      const { currentPassword, newPassword, cPassword } = req.body
      
      const doctor = await Doctor.findById(_id)
      console.log(doctor.password);
      console.log(currentPassword);
      const passwordMatch = await bcrypt.compare(
        
       currentPassword,
       doctor.password
      );
      console.log(passwordMatch);
      console.log(currentPassword);
      const passwordHashed = await bcrypt.hash(newPassword, 10);
      console.log(passwordHashed);
      if (passwordMatch==true) {
        
        const changePassword = await Doctor.findByIdAndUpdate(_id, { $set: { password: passwordHashed } })
        res.status(200).json({ msg: 'success' })
      } else {
        res.status(404).json({ error: 'No such data' })
      }
    } catch (error) {
      res.status(404).json({ error: error.message })
    }
  },
  getBookings:async(req,res) =>{
    const {authorization} =req.headers
    console.log(authorization);
          const token=authorization
          const {_id} = jwt.verify(token,process.env.SECRET)
          console.log(_id);
          const doctor = await Doctor.findById({_id:_id})
          console.log(doctor.name);
          const bookingDetails = await Booking.find({$and: [{doctor_id:doctor.name},{status:true}]})
          console.log(bookingDetails);
          res.json(bookingDetails)


  },
  getSingleBooking:async(req,res) =>{
    
    const id =req.params.id
    console.log(id);
    const booking = await Booking.findById({_id:id})
    console.log(booking);
    res.json(booking)
  },
  prescriptionAdding:async(req,res) =>{
    console.log("hhh");
    const {docName,clientName,time,date,disease,medicine,bookid} = req.body
    console.log(bookid);
    const presExist = await Prescription.findOne({bookingid:bookid})
    if(presExist){
      res.json({message:"Prescription already added"})
      console.log("dfgfgddfg"+presExist);

    }else{
    const prescription = new Prescription({
      bookingid:bookid,
      clientName:clientName,
      doctorName:docName,
      date:date,
      starting_time:time,
      disease:disease,
      medicine:medicine

    })
  
    await prescription.save();
    res.status(201).json({ message: "succcessfully added" });
console.log("succesfully added");
  }


  },
  getPrescription:async(req,res) =>{
    
    const id =req.params.id
    console.log(id);
    const prescription = await Prescription.findOne({bookingid:id})
    console.log("hghgfhf"+prescription);
    res.json(prescription)
  },
 
  getAllBookings:async(req,res)=>{
    try {
      const {authorization} =req.headers
    console.log(authorization);
          const token=authorization
          const {_id} = jwt.verify(token,process.env.SECRET)
          console.log(_id);
          const doctor = await Doctor.findById({_id:_id})
          console.log(doctor.name);
          const bookingDetails = await Booking.find({doctor_id:doctor.name})
      
      res.json(bookingDetails)
      
    } catch (error) {
      
    }
  },
  getClients: async (req, res) => {
    try {
    clientDetails=await Client.find()

    res.json(clientDetails)

  }
  catch (error) {
   
 }

  }, 
  cancelbooking: async(req,res)=>{
    console.log("hii");
    const id=req.params.id
    const booking= await Booking.findById({_id:id})
   
    console.log(booking.status);
    if(booking.status===true){
      await Booking.findByIdAndUpdate(id,{$set:{status:false}})
      res.json({success:true})
      const user =booking.client_id
      const userData=await Client.findOne({name:user})
      const email =userData.email
     
        
  
        let mailDetails = {
          from: "mankindmedicare@gmail.com",
          to: email,
          subject: "Booking Cancellation",
  
          html: "<p>Your Recent Booking with Mankind Hospital Has Been Cancelled Please Connect With Hospital For Further Details</p>",
        };
        mailer.mailTransporter.sendMail(mailDetails, (err, data) => {
          console.log(data);
          if (err) {
            console.log(err);
          } else {
            console.log("cancellation mailed");
          }
        });
  
  
  
  
    }else{
      
    }
  },
  blockClient: async(req,res)=>{
    const id=req.params.id
    const client= await Client.findById({_id:id})
   
    console.log(client.status);
    if(client.status===true){
      await Client.findByIdAndUpdate(id,{$set:{status:false}})
      res.json({success:true})
    }else{
      await Client.findByIdAndUpdate(id,{$set:{status:true}})
      res.json({success:true})
    }
  }


};
