const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash')
const session= require('express-session')
const db = require("./db/db")
const dbFunction = require("./db/DbFunction")(db)
 
const app = express()


app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }))
 
app.use(bodyParser.json()) 
app.use(session({
    secret : "kay",
    resave : false,
    saveUninitialized: true,
     cookie: { maxAge: 60000 }
}));

app.use(flash());


app.get('/', async function(req,res){
  const regNumbers=await dbFunction.getRegNum()
  res.render('index',{
regNumbers
  })


})
app.post('/reg_numbers', async function(req,res){
let reg= req.body.regnumbers

console.log(reg)
if(!/^[A-Z]{2}\s[0-9]{3}(\s|\-)?[0-9]{3}$/.test(reg)){
req.flash("info","Invalid registration number")
}else if(reg){
  await dbFunction.insertRegistration(reg.toUpperCase())
  req.flash("info","registration number added")
}else{
req.flash("info","Please enter registration number")

}
res.redirect("/")

})
app.post('/filter' ,async function(req,res) {
  let city = req.body.city
   const regFilter = await dbFunction.getRegFilter()
  res.render('index',{
regFilter
  })

})
app.get('/clear' ,async function(req,res) {

  await dbFunction.clearTownReg()
  res.redirect('/');
})
// app.get('/',routes)


const PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});  