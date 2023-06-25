//**************NODE JS BASICS ****************/

// import http from 'http'
// import * as myObj from './features.js'

// console.log(myObj.lobpercentage())
// console.log(myObj.val)

// const server = http.createServer((req,res)=>{
//     if(req.url === "/")
//         res.end(`<h1>Home lob is ${myObj.lobpercentage()}</h1>`)

//     else  if(req.url === "/about")
//         res.end("<h1>About</h1>")

//     else res.end("<h1>404 page not found</h1> ")
// })

// server.listen(5000,()=>{
//     console.log('Server is working')
// })

// ********************EXPRESS JS*********************************

import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import cookieParser from "cookie-parser"


const app = express()

//MIDDLEWARE serving static files (in public folder)
app.use(express.static(path.join(path.resolve(),"public")))
// specifying the engine for static files
app.set("view engine","ejs")
//MIDDLEWARE for fetching data from form POST method
app.use(express.urlencoded({extended:true}))
//MIDDLEWARE for fetching cookies
app.use(cookieParser())

// app.get("/",(req,res)=>{
    
//     // ********sends JSON data*******
//     // res.json({
//     //     success:true,
//     //     products:[],
//     // })


//     //******sends status code********
//     //res.s endStatus(404)
//     //res.status(404).send('page nahi mila')


//     //********serving a .html file*********
//     //const pathLocation = path.resolve()
//     //res.sendFile(path.join(pathLocation,'./index.html'))

//     //********serving a ejs file */
//     res.render("login")

    
// })

app.get("/success",(req,res)=>{
    res.render("success")
})

const user=[]
//API to display data of users on screen
app.get("/users",(req,res)=>{
    res.json(user )
})

app.post("/home",async (req,res)=>{
    //console.log(req.body.name)-
    user.push({username:req.body.name,email:req.body.email})
    //console.log(user)

    const {name,email} = req.body
    const userdata = {name:name,email:email}
    await Message.create(userdata);
    res.redirect('/success')   // REDIRECT
    //res.render("success")       RENDER
})

//************integrating mongoDB database ***************/

//creates the backend
mongoose.connect("mongodb://localhost:27017",{
   dbName:'backand',
})
.then(c=>console.log('db connected'))
.catch(e=>console.log(e))

//defines the structure of data
const messageSchema = new mongoose.Schema({
    name:String,
    email:String
})

//create a collection in the database
const Message = mongoose.model("Mesddsage",messageSchema) 

//dummy API call
app.get('/add',async (req,res)=>{
    await Message.create({name:"Abhi",email:"sample@gmail.com"})
    res.send('db connected')
})


//************************AUTHENTICATION******** *********** */
// API to add a cookie when login button is clicked and disp logout button
app.post("/login",(req,res)=>{
    res.cookie('token','iamin',{
        httpOnly:true,
        expires:new Date(Date.now() + 1000)
    })//saves a cookie
    res.redirect("/")
})

//API call to remove the cookie instantly and display login button
app.get('/logout',(req,res)=>{
    res.cookie('token',null,{
        httpOnly:true,
        expires:new Date(Date.now())
    })//saves a cookie
    res.redirect("/")
})


app.get('/',(req,res)=>{
    const {token} = req.cookies
    if(!token){
        res.render('login')
    }
    else{
        res.render('logout')
    }
    //console.log(req.cookies,req.cookies.token)
})

//start the server
app.listen(5000,()=>{
    console.log('server up')
})