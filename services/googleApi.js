const translate = require('@vitalets/google-translate-api');
const error = require('../utils/errorHandler');


module.exports = async (text, requestedLanguage)=> {
        const result = await translate(text, {to: requestedLanguage})
        return result 
}