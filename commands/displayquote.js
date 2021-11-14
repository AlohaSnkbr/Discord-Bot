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
                                count: "Quotes: " + await quoteSchema.countDocuments({quoteOf:{$eq:name[i]}})
                            }
                            jArray[i] = json;
                        }
                        embed = page(jArray,message);
                    }
                }
                var authorQcount = await quoteSchema.countDocuments({quoteOf:{$eq:arguments[0]}}).catch((e)=>{console.log(e);});
                if (authorQcount > 0)
                {
                        var jArray = [];
                        var Cursor = await quoteSchema.find({quoteOf:{$eq:arguments[0]}});
                        Cursor.forEach(function(doc){
                            var json = {
                                data:doc.content,
                                value: relativeDate(doc.createdAt,new Date()),
                            }
                            jArray.push(json);
                        })
                        embed = page(jArray,message);
                }
                if (arguments[0] == null)
                {
                    misArg = true;
                    message.channel.send("Missing arugments");
                }
            }
            finally{}
        })
    }
}