if(process.env.NODE_ENV === 'production'){
    module.exports =  {mongoURL:
        URI ="mongodb+srv://user:user@cluster0-ha9ym.mongodb.net/test?retryWrites=true&w=majority"
 }
}
else{
    module.exports =  {mongoURL:
    URI = 'mongodb://localhost/Ali_express_clone'
}
}