const translate = require('@vitalets/google-translate-api');
const Cache = require('../models/cache');



exports.postTranslate = async (req,res,next)=>{
    try{
    const text = req.body.text // user entered text
    const enteredLanguage = req.body.enteredLanguage // user entered country
    const requestedLanguage = req.body.requestedLanguage// user selected country 


    const result = await translate(text,{from:enteredLanguage ,to: requestedLanguage})
    if(!result){
       const error = new Error('Something went wrong please try again'); // if anything get wrong in api call 
        error.statusCode= 500;
        throw error;
    }

    // saving data into cache 
    const cache = new Cache({
        text:text,
        fromLanguage:enteredLanguage,
        toLanguage: requestedLanguage,
        convertedText: result.text,
    })

    const savedCache = await cache.save();
    if(!savedCache){
        const error = new Error('Something went wrong please try again'); // if anything get wrong in db connection 
        error.statusCode= 500;
        throw error;
    }

    // translated text
    res.status(200).json({
        message:"success",
        data:result.text,
        error:"",
    })
  }catch(error){
      next(error)
  }
}