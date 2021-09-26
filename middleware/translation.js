const Validator  = require('validator');
const Cache = require('../models/cache');


module.exports = async (req,res,next)=>{
    try{
        const text = req.body.text;
        const enteredLanguage = req.body.enteredLanguage;
        const requestedLanguage = req.body.requestedLanguage;
        // Validation part 
        if(Validator.isEmpty(text)){
            const error = new Error('Text field can not be blank ');
            error.statusCode = 422;
            throw error;
        }
        if(Validator.isEmpty(enteredLanguage)){
            const error = new Error('Country  field can not be blank ');
            error.statusCode = 422;
            throw error;
        }
        if(Validator.isEmpty(requestedLanguage)){
            const error = new Error('Country field can not be blank ');
            error.statusCode = 422;
            throw error;
        }

        // Cache Filtering
        const repeatedText = await Cache.findOne({text:text})
        if(repeatedText){
            console.log("from cache"); // data is getting cache
            if(repeatedText.fromLanguage === enteredLanguage && repeatedText.toLanguage === requestedLanguage){
                return res.status(200).json({
                    message:"success",
                    data:repeatedText.convertedText,
                    error:"",
                })
            }
        }
        
        // All goes well
        next();
    }
    catch(error){
        error.statusCode = 500
        next(error)
    }
}