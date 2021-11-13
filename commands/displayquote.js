const Discord = require('discord.js')
const mongo  = require('../mongo.js')
const { count } = require('../schema/quote')
const quoteSchema = require('../schema/quote')
var embed;
//TODO maybe: quote approve     
          
module.exports =
{ 
    commands: ['displayquote','dq'],
    callback: async (message,arguments) => {
        await mongo().then(async (mongoose) => {
            try{
                console.log("arugment %s",arguments[0]);
               const name = await quoteSchema.distinct("quoteOf");
               embed = new Discord.MessageEmbed()
               .setTitle("Quote List");
               if(arguments[0] == "all")
                {
                for(let i=0;i< name.length;i++){ 
                embed.addField(name[i],await quoteSchema.countDocuments({quoteOf:{$eq:name[i]}},function(err,count){if (err) console.log(err); return count;}),false)
                    }
                }
                const fnd = await quoteSchema.findOne({quoteOf:{$eq:arguments[1]}}).exec();
                console.log(fnd);
                
                if (arguments[0] == "")
                {
                    console.log("name found");
                    await quoteSchema.find({quoteOf:{$eq:arguments[1]}},function (err,res)
                    {if (err) console.log(err);
                        embed.setTitle(arguments[1]);
                        for (n in res)
                        {
                            embed.addField({value: n});
                        }
                    })
                }
                else if (arguments[0] == "")
                {
                    message.channel.send("Missing arugments");
                }
            }
            finally{
                mongoose.connection.close()
            }
               message.channel.send(embed)
        })  
        //message.react('')   
    }
}