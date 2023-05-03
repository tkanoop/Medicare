const express = require('express')
const app =express()
const dotenv=require('dotenv')
const cors=require('cors')
const morgan=require('morgan')
const clientRoutes=require('./routes/client')
const adminRoutes= require('./routes/admin')
const doctorRoutes=require('./routes/doctor')
const requireAuth = require('./middleware/requireAuth')
dotenv.config()
app.use(express.json())
app.use(morgan('dev'))

const mongoose=require('mongoose')
app.use(
    cors({
        origin:['http://localhost:3000'],
        methods:['GET','POST','PATCH'],
        credentials:true
    })
)

app.use('/api/client',clientRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/doctor',doctorRoutes)



mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log(err);
    })

app.listen(process.env.PORT,()=>{
    console.log(`port is running at ${process.env.PORT}`);
})