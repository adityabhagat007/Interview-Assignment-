
const Cache = require('../models/cache');
const error = require('../utils/errorHandler');
const googleApi = require('../services/googleApi')

exports.postTranslate = async (req,res,next)=>{
    try{
    const text = req.body.text // user entered text
    const requestedLanguage = req.body.requestedLanguage// user selected country

    // Api Call 
    const result = await googleApi(text,requestedLanguage);
    if(!result){
       error('Something went wrong please try again',500) // if anything   get wrong in api call 
    }

    // saving data into cache 
    const cache = new Cache({
        text:text,
        fromLanguage:result.from.language.iso,
        toLanguage: requestedLanguage,
        convertedText: result.text,
    })

    const savedCache = await cache.save();
    if(!savedCache){
        error('Something went wrong please try again',500) // if anything get wrong in db connection 
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