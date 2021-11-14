const mongoose = require('mongoose')
const {mongoPath} = require('./config.json')

module.exports = async () =>{
    try{
        await mongoose.connect(mongoPath,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000,
            keepAlive: 1
        })
    }
    catch(err)
    {
        console.log("an error");
    }
    finally{return mongoose;}
}
