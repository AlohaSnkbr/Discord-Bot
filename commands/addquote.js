const mongo = require('../mongo.js');
const quoteSchema = require('../schema/quote')
//TODO maybe: quote approve

module.exports = 
{
    commands: ['addquote','aq'],
    expectedArgs: '<name> "<quote>"',
    minArgs: 2,
    callback: async (message,args) => {
        const { guild, author } = message              
        const name = args[0]
        args.shift()
        const quote = args.join(" ")
        await mongo().then(async (mongoose) => {
            try{
                await new quoteSchema({
                    guildId: guild.id,
                    quoteOf: name,
                    content: quote,
                    createdAt: message.createdAt,
                    userId: author.id
                }).save()
                message.reply('Your quote was added to the database')
            }
            finally{
                mongoose.connection.close();
            }
        })
        .catch((e)=>{
            console.log(e);
            message.reply('Failed to save to the database, please notify creator')
            .then((message)=>{
                message.delete({
                    timeout:1000*10
                })
            })
        })
    }


}