const Doctor = require("../../models/doctor");
const Booking = require("../../models/booking")
const Prescription = require("../../models/prescription")
const jwt=require("jsonwebtoken")
const createToken = (_id) => {
  return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

module.exports = {
  doctorLogin: async (req, res) => {
    try {
      const data=req.body
      const doctorExist =await Doctor .findOne({email:req.body.email})
      if(doctorExist){
        if(doctorExist.email==req.body.email&&doctorExist.password==req.body.password){
          const token=createToken(doctorExist._id)
          const id=doctorExist._id
          console.log(token)
          res.status(201).json({id,token})

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

      const { id } = req.params
      console.log(id);
      const doctor = await Doctor.findById(id)
      res.status(200).json(doctor)
    } catch (error) {
      console.log(error);
    }
  },
  changePassword: async (req, res) => {
    try {
      const { id, currentPassword, newPassword, cPassword } = req.body
      const doctor = await Doctor.findById(id)
      console.log(doctor);
      if (doctor.password === currentPassword) {
        const changePassword = await Doctor.findByIdAndUpdate(id, { $set: { password: newPassword } })
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
          const bookingDetails = await Booking.find({doctor_id:doctor.name})
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


  }
};
