const nodemailer=require('nodemailer');

module.exports={
  mailTransporter:nodemailer.createTransport({
    service:'gmail',
    auth:{
      user: 'mankindmedicare@gmail.com',
      pass: 'tfjxcjhwetyydlby'
    },
  }),
  OTP:`${Math.floor(1000+Math.random()*9000)}`,
}