const Discord = require('discord.js')
const mongo  = require('../mongo.js')
const { count, eventNames } = require('../schema/quote')
const quoteSchema = require('../schema/quote')
const relativeDate = require('tiny-relative-date')
const page = require('../pages.js');
var embed;
//TODO maybe: quote approve     
          
module.exports =
{ 
    commands: ['displayquote','dq'],
    callback: async (message,arguments) => {
        await mongo().then(async (mongoose) => {
            try{
                var valArg = true;
                const name = await quoteSchema.distinct("quoteOf");
                embed = new Discord.MessageEmbed()
                .setTitle("Quote List");
                
                if(arguments[0] == "all")
                {
                    if(name.length>5)
                    {
                        var jArray = [];
                        for (let i = 0; i < name.length;i++){
                            var json = {
                                name:name[i],
                                count: await quoteSchema.countDocuments({quoteOf:{$eq:name[i]}})
                            }
                            jArray[i] = json;
                        }
                        page(jArray,message);
                    }
                }
                var fnd = await quoteSchema.findOne({quoteOf:{$eq:arguments[0]}});
                var commandQuote;
                if (fnd) {commandQuote = fnd.quoteOf;}
                if (arguments[0] == commandQuote)
                {
                    embed.setTitle(commandQuote);
                    var Cursor = await quoteSchema.find({quoteOf:{$eq:arguments[0]}},function (err,res){if (err) console.log(err); return res;}).clone().catch(function(err){ console.log(err)});
                    Cursor.forEach(function(doc){if (doc){embed.addField(doc.content,relativeDate(doc.createdAt,new Date()))}});
                }
                if (arguments[0] == null)
                {
                    valArg = false;
                    message.channel.send("Missing arugments");
                }
            }
            finally{
                if(valArg){message.channel.send(embed);}
            }
        })
    }
}