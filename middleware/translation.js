const Validator  = require('validator');
const Cache = require('../models/cache');
const error = require('../utils/errorHandler');
const language = require('../utils/language');


module.exports = async (req,res,next)=>{
    try{
        const text = req.body.text;
        const requestedLanguage = req.body.requestedLanguage;

        // Validation part 
        if(Validator.isEmpty(text)){
            error("Text field cannot be empty",422);
        }

        if(Validator.isEmpty(requestedLanguage)){
            error("Language field cannot be empty",422);
        }

        if(!language.isSupported(requestedLanguage)){
            error("Language is not supported",422);
        }

        // Cache Filtering
        const repeatedText = await Cache.findOne({text:text,toLanguage:requestedLanguage})
        if(repeatedText){
            console.log("from cache"); // data is getting cache
                return res.status(200).json({
                    message:"success",
                    data:repeatedText.convertedText,
                    error:"",
            })
        }
        
        // All goes well
        next();
    }
    catch(error){
        next(error)
    }
}