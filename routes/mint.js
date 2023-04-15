const express = require('express');
const { default: mongoose } = require('mongoose');
const router  = express.Router();
var url = require('url');
var formidable = require('formidable');
const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');
const Token = require('../models/token');

router.get('/',(req,res)=>{
    res.render('mint')
})

router.post('/upload',(req,res)=>{
    console.log(req.body)
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        console.log(fields);
   
   const newToken= new Token({
    imageUri : "https://bafybeicvkgxxz37dfeecyjki6cf7nkcwbuxuds7wddaijiywvjymbayj6q.ipfs.nftstorage.link/",
    name : fields.tokenName,
    tokenType: fields.type,
    description: fields.Desc,
    uriPositionPointer: fields.pointer,
    externalUriPath: fields.api
   });
   newToken.save().then((value)=>{
    console.log(value._id.valueOf())
    //res.send(value._id.valueOf())
    res.render('upload',{fileid:value._id.valueOf() })
        })
    
   });

})

module.exports  = router;