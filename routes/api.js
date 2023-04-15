const express = require('express');
const { mongoose } = require('mongoose');
const router  = express.Router();
var url = require('url');
const Token = require("../models/token.js");
const { isNull } = require('util');
var ObjectId = require('mongoose').Types.ObjectId; 
const nodeHtmlToImage = require('node-html-to-image');
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));
/*
router.get('/',(req,res)=>{
    res.render('api')
})
*/
router.get('/img/:id',(req,res)=>{
    id=req.params.id;
    console.log(id);
    Token.findOne({_id: new ObjectId(id)}).then((token)=>{
        var background_img=token.imageUri;
        var response=fetch(token.externalUriPath).then((response)=>{
            response.text().then((text)=>{            console.log(text);
                nodeHtmlToImage({
                    html: '<html><body style="background-size: 500px 500px;width:500px;height:500px;color:white;display:flex;justify-content:center;align-items:center;background-image: url('+background_img+');"><h2>'+text+'</h2></body></html>'
                  }).then((image)=>{
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    res.end(image, 'binary');})})

        });

          
    })

})
router.get('/:id',(req,res)=>{
    id=req.params.id;
    console.log(id);
    Token.findOne({_id: new ObjectId(id)}).then((token)=>{
        var data={}
        data.name=token.name;
        data.description=token.description;
        data.image="https://127.0.0.1:3000/api/img/"+id;

        res.send(data);
    })
})

module.exports  = router;