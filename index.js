const express = require('express')
const connectToMongo=require('./db')
const authRoutes=require('./routes/auth')
const clubRoutes=require('./routes/club')
const adminRoutes=require('./routes/admin')
const cors=require('cors')
const mongoose =require('mongoose')

//connecting to Mongo server
const MONGO_URI='mongodb+srv://Tarjan:Nikhil%401998@cluster0.hmsx5dv.mongodb.net/nabadisha'
mongoose.connect(MONGO_URI)
     .then(result=>{
        console.log('MongoDB connected...')
     })


//creating express instance
const app = express()
const port = 3434

//supported responses
app.use(express.json())
//for support external frontend IP
app.use(cors())

//Routes

app.use('/',clubRoutes)
app.use('/v1/api', authRoutes)
app.use('/v1/admin/api', adminRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})