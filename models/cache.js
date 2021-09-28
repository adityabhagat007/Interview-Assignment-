const mongoose = require('mongoose');

const Schema = mongoose.Schema

const cacheSchema = new Schema({
    text:{
        type: String,
        required: true,
    },
    fromLanguage:{
        type: String,
    },
    toLanguage:{
        type:String,
        required: true,
    },
    convertedText:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Cache", cacheSchema);