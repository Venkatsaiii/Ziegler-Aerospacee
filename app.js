const express=require('express')
const app=express();
const path=require('path');
const mongoose = require('mongoose');
const morgan=require("morgan")
const ejsMate=require("ejs-mate"); // to add boiler plate
const methodOverride = require('method-override');
const Buyer=require('./models/buyer');
const Seller=require('./models/seller');
mongoose.connect('mongodb://127.0.0.1:27017/ziegler', {
  useNewUrlParser: true,
//  useCreateIndex: true,
  useUnifiedTopology: true,})
.then(()=>{
  console.log("connection open");
})
.catch(err=>{
  console.log("error..")
  console.log(err)})

  app.engine('ejs',ejsMate)
  app.set('view engine', 'ejs')
  app.set('views',path.join(__dirname, 'views'))
  app.use(morgan('tiny'));
  app.use(express.urlencoded({extended:true}))

app.get("/home",(req,res)=>{
  res.render('home')

})

app.get("/buyer",async(req,res)=>{
  const buyer = await Buyer.find({});
    res.render('buyer',{buyer});

})
app.get("/new",(req,res)=>{
  res.render('new')

})
app.post('/new',async(req,res)=>{
  const a= Buyer(req.body.a)
  await a.save();
  res.render("buyer")
})
app.get("/buyer/:id",async(req,res)=>{
  const param=await Buyer.findById(req.params.id)
  res.render("cart",{param})
})
app.get("/contact",(req,res)=>{
  res.render("contact")
})

  app.listen(3000,(req,res)=>{
    console.log("server connected")
  })
