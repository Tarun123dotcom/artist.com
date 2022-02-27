const express = require("express")
const path = require("path")
const app = express();
const bodyparser = require("body-parser")
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/artist")
const port = 80;
const fs = require("fs")
const ejs = require("ejs");
const { required } = require("nodemon/lib/config");



// Defining mongoose schema
const contactschema = new mongoose.Schema({
    name: String,
    age:Number,
    emailId:String,
    mobileNO:Number,
    message:String
})
// Defining mongoose schema for log in 
const loginschema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    }
    
})
const registerschema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    passWord:{
        type:String,
        required:true
    },
    copassWord:{
        type:String,
        required:true
    }
})
const register = mongoose.model("Registered",registerschema)
// Defining model for login Scema
const login = mongoose.model("Login",loginschema) 
// Defining model for schma
const contact = mongoose.model("Contact",contactschema)

app.use("/static",express.static('static'))
app.set('view engine','pug')
app.set('viwes',path.join(__dirname,'views'))
app.use(express.urlencoded())
app.get("/",(req,res)=>{
    res.status(200).render('index')
})
app.get("/home",(req,res)=>{
    res.status(200).render('index')
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.get("/contactus",(req,res)=>{
    res.render("contactus.pug")
})
app.get("/login",(req,res)=>{
    res.render("login.pug")
})
app.get("/about2",(req,res)=>{
    res.render("about2.pug")
})
app.get("/contact2",(req,res)=>{
    res.render("contact2.pug")
})
// app.get("/register",(req,res)=>{
//     res.sendFile("C:\Users\Tarun Siddartha\WebDevelopment\Artist website\views\register.html")
// })
app.get("/home2",(req,res)=>{
    res.render("home2.pug")
})
app.get("/user",(req,res)=>{
    res.render("user.pug")
})
app.post("/login",(req,res)=>{
    var logiData = new login(req.body);
    logiData.save().then(()=>{
        res.render("home2.pug")
    }).catch((e)=>{
        res.status(200).send(`${e}`)
    })
})
app.post("/register",(req,res)=>{
    pass1 = req.body.passWord;
    pass2 = req.body.copassWord;
    var regiData = new register(req.body);
    if(pass1 == pass2){
        regiData.save().then(()=>{
            res.render("home2.pug")
        }).catch((e)=>{
            res.status(200).send(`${e}`)
        })
    }
    else{
      res.send(`${e}`)  
    }
})
app.post("/contactus",(req,res)=>{

    var myData =new contact(req.body);
    myData.save().then(()=>{
        res.render("contacted.pug")
    }).catch((e)=>{
        res.status(200).send(`${e}`)
    })
})
app.post("/contact2",(req,res)=>{
    var myData =new contact(req.body);
    myData.save().then(()=>{
        res.render("contacted2.pug")
    }).catch((e)=>{
        res.status(200).send(`${e}`)
    })
})
app.get("/contacted2",(req,res)=>{
    res.render("contacted2.pug")
})

app.post("/user",(req,res)=>{
    res.render("index.pug")
})
app.get("/register",(req,res)=>{
    res.render("register.pug")
})

app.listen(port,()=>{
    console.log("The website is opened at port 80")
})