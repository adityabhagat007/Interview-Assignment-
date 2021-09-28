module.exports = (text , status)=> {

    const error = new Error(text);
    error.statusCode = status;
    throw error;
    
}