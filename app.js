const express = require('express');
const path = require('path');
const session = require('express-session')

const app = express();
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));

app.use(session({
    secret: "dashboard-secret",
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.personData = req.session.personData || null;
    next();
});

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

const route = require('./routers/route');
const croute = require('./routers/crud')
app.use(route);
app.use(croute)


app.listen(3003, ()=>{
    console.log("running on http://localhost:3003/");
    
});

