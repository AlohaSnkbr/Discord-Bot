const Discord = require('discord.js');
const pagination = require('discord.js-pagination');

module.exports = async(list,message) => 
{
    var pages = [];
    for(let i = 0; i<list.length/5; i++)
    {
        var embed = new Discord.MessageEmbed();
        for(let j=i*5; j<(i*5)+5&&j<list.length;j++)
        {
            embed.addField(list[j].name,list[j].count);
        }
        pages[i] = embed;
    }
    pagination(message,pages);
} 

