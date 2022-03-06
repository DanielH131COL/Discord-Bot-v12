const Discord = require('discord.js')

module.exports = {
    name: "dsay",
    run: async(client, message, args) => {
        message.channel.send(args.join(" "))
        message.delete()
    }
}