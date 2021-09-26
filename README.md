# Interview-Assignment
This an interview assignment  
## Question

Create a web server with a RESTful API to translate a text from one language to another.
For the actual translation, you can use an external service like Google Translate or Bing Translations. 
The source and target language should be definable via the API.
In addition, we want to cache (store in Database) translations, in order to avoid repeated hits to the translation API. The 
cache must be persistent!
The server should have an extensible architecture. E.g. We may want to change our caching strategy or switch out our 
translation service.

## Technologies 

1. NodeJs <br>
2. ExpressJs

## Libraries 

1. Mongoose
2. vaildator
3. @vitalets/google-translate-api (For translation)


## DB
1. MongooDB
