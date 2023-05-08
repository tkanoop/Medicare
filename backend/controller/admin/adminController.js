const Department = require("../../models/department");
const Doctor = require("../../models/doctor");
const mailer = require("../../config/mailer");
const Client = require("../../models/client")
const Admin = require("../../models/admin")
const Booking = require("../../models/booking")
const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt");
const client = require("../../models/client");
const createToken = (_id) => {
  return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

module.exports = {
  addDepartment: async (req, res) => {
    console.log(req.file);

    const DepartmentExist = await Department.findOne({
      department: req.body.department.toUpperCase(),
    });
    if (DepartmentExist) {
      res.status(201).json({ err: "Department Already Exist" });
     
    } else {
      const newDepartment = new Department({
        department: req.body.department.toUpperCase(),
        image: req.file.path,
      });
      await newDepartment.save();
      res.status(201).json({ message: "succcessfully added" });
    }
  },
  login: async (req,res)=>{
    try {
      const password=req.body.password
      const email=req.body.email
      
      const credentials = await Admin.findOne({email:req.body.email})
     
      if(credentials.email==email&&credentials.password==password){
        console.log(credentials._id);
        const token=createToken(credentials._id)
        console.log(token);
        res.status(201).json({token})
      }else{
        res.json({error:"Incorrect password or email"})
        console.log("error");
      }
      
    } catch (error) {
      
    }

  },
  getDepartment: async (req, res) => {
    try {
      const departments = await Department.find();
      console.log(departments);
      res.json(departments);
    } catch (error) {
      console.log(error);
    }
  },
  doctorData: async (req, res) => {
    try {
      

      let mailDetails = {
        from: "mankindmedicare@gmail.com",
        to: req.body.email,
        subject: "User Verification",

        html: `<p>YOUR CREDENTIALS TO ACCESS MANKIND WEBSITE IS <br> Email : ${req.body.email} <br>  Password : ${mailer.OTP}</p>`,
      };
      mailer.mailTransporter.sendMail(mailDetails, (err, data) => {
        console.log(data);
        if (err) {
          console.log(err);
        } else {
          console.log("otp mailed");
        }
      });
      const passwordHash = await bcrypt.hash(mailer.OTP, 10);



      const newDoctor = new Doctor({
        name: req.body.name,
        department: req.body.department,
        mobile: req.body.mobile,
        email: req.body.email,
        speciality: req.body.speciality,
        languages: req.body.language,
        hospitals: req.body.hospital,
        image: req.file.path,
        password:passwordHash
      });
      await newDoctor.save();
      res.status(201).json({ message: "Successfully Mail send" });
    } catch (error) {}
  },
  getClients: async (req, res) => {
    try {
    clientDetails=await Client.find()

    res.json(clientDetails)

  }
  catch (error) {
   
 }

  },
  getDoctors: async (req,res)=>{
    try {
      doctorDetails=await Doctor.find()
      console.log(doctorDetails);
      res.json(doctorDetails)
      
    } catch (error) {
      
    }
  },
  getDepartments: async (req,res)=>{
    try {
     const departmentDetails=await Department.find()
     
      console.log(departmentDetails);
      res.json(departmentDetails)
      
    } catch (error) {
      
    }
    
},
getBookings: async (req,res)=>{
  try {
    const bookingDetails = await Booking.find()
    console.log(bookingDetails);
    
    res.json(bookingDetails)
    
  } catch (error) {
    
  }
},
blockdoctor: async(req,res)=>{
  const id=req.params.id
  console.log(id);
  const doctorstatus=await Doctor.findById({_id:id})
  if (doctorstatus.status===true){
  const isBlocked=await Doctor.findByIdAndUpdate(id,{$set: {status:false}})
  console.log(isBlocked.status);
  res.json({success:true})
  }else{
    const isBlocked = await Doctor.findByIdAndUpdate(id,{$set:{status:true}})
    console.log(isBlocked.status);
    res.json({success:true})
  }

},
blockDepartments: async(req,res)=>{
  const id=req.params.id
  const department= await Department.findById({_id:id})
  if(department.status===true){
    await Department.findByIdAndUpdate(id,{$set:{status:false}})
    res.json({success:true})
  }else{
    await Department.findByIdAndUpdate(id,{$set:{status:true}})
    res.json({success:true})
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
},
getPrescription:async(req,res) =>{
    
  const id =req.params.id
  console.log(id);
  const prescription = await Prescription.findOne({bookingid:id})
  console.log("hghgfhf"+prescription);
  res.json(prescription)
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
},
cancelbooking: async(req,res)=>{

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
}
}
