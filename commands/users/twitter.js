const {MessageEmbed, Role} = require('discord.js')

module.exports = {
    name: 'twitter',
    run: async(client, message, args) => {
        const mentionMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        const embed = new MessageEmbed()
        .setColor('ORANGE')
        .addFields(
        {
          name: "Nuestro Twitter Oficial es:",
          value: "https://twitter.com/DixPvPNW"
        },
        )
        await message.channel.send(embed)
        message.delete()
    }
}