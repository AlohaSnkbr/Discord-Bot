const quoteSchema = require('../schema/quote')

module.exports = async (client) => {
    const quote = await quoteSchema.find()

        for (const quote of quotes){
            const {guildId,content,createdAt,userId} = quote

            const guild = await client.guilds.cache.get(guildId)
            if(!guild){
                console.log(`Removing guild ID "${guildId}"from the database`)
                await quoteSchema.deleteOne({guildId})
                return
            }
        }
}