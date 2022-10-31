const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash')
const session= require('express-session')
const db = require("./db/db")
const dbFunction = require("./db/DbFunction")(db)
 const routes= require("./routes")(dbFunction)
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

app.get('/',routes.getIndex)
app.post('/reg_numbers',routes.insertRegistrations)
app.post('/filter',routes.getfilter)
app.post('/clear',routes.clearREGnum)


const PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});  