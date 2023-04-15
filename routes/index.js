const express = require('express');
const { default: mongoose } = require('mongoose');
const router  = express.Router();
var url = require('url');

router.get('/',(req,res)=>{
    res.render('landing')
})

module.exports  = router;