const mongoose = require('mongoose');
const TokenSchema  = new mongoose.Schema({
  
  name :{
    type  : String,
    required : true
  } ,
  tokenType :{  
    type  : String,
    required : true
  },
  imageUri :{
    type  : Object,
    required : true
  },
  description :{
    type : String,
    required:true
  },
  externalUriPath :{
    type : String,
    required : true
  },  
  uriPositionPointer:{
    //RFC6901 standard
    type : String,
    required : true
  },
  criteria:{
    type : Object,
    required: false,
  },


});
const Token= mongoose.model('Token',TokenSchema);

module.exports = Token;