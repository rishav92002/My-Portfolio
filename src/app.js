const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')
require('./database/config');
const userdata = require('./model/model')

//port
const port = process.env.PORT || 8000;
//path of views
const viewspath = path.join(__dirname,'../views')
//partials path
const partialspath = path.join(__dirname,'../views/partials')



//setting of view engine
app.set('view engine', 'hbs')

app.set('views', viewspath)
///link bootstrap css,js to node js
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")))
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")))
//using custom css
app.use('/public',express.static(path.join(__dirname,"../public")))
//register partials
hbs.registerPartials(partialspath)



app.use(express.urlencoded({extended: false}))



app.get('/',(req,res)=>{
    res.render("home")
})
//we have to post the contactdata on clicking the submit button
app.post('/contactdata', async(req,res)=>{
    try{
       const name = req.body.user;
       const email = req.body.email;
       const msg= req.body.msg;

       const contactsave = new userdata({
        name: name,
        email:email,
        message:msg
       })
       const savedata = await contactsave.save(); 
       if(savedata){
        res.render('home')
       }


    }catch(error){
        res.status(401).send(error)

    }
})




app.listen(port,()=>{
    console.log(`server is listening at port ${port}`)
})