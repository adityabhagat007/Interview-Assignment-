
const express = require('express');
const translateControllers = require('../controllers/translate');

// Basic Validation 

const translateMiddleware = require('../middleware/translation');

const router = express.Router();


//route:-  /main/translate

router.post('/translate',translateMiddleware,translateControllers.postTranslate)


module.exports= router;