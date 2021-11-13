const { fs } = require('fs')
const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const quoteSchema = new mongoose.Schema({
    guildId: reqString,
    quoteOf: reqString,
    content: reqString,
    createdAt: reqString,
    userId: reqString

})

module.exports = mongoose.model('quotebot-quote-schema',quoteSchema,'quotes')
