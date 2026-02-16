const express = require('express');
const route = express.Router();

route.get('/',async(req,res)=>{
    res.render('index')
})

route.get('/addList',async(req,res)=>{
    res.render('addList')
})

route.get('/listings',async(req,res)=>{
    res.render('listings')
})

route.get('/review',async(req,res)=>{
    res.render('review')
})

route.get("/savedsearch", (req, res) => {
  res.render("savedsearch", {
    personData: req.session.personData
  });
});

route.get("/message", (req, res) => {
  res.render("message", {
    personData: req.session.personData
  });
});

route.get("/setting", (req, res) => {
  res.render("setting", {
    personData: req.session.personData
  });
});


module.exports=route;