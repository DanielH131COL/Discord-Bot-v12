const {MessageEmbed, Role} = require('discord.js')

module.exports = {
    name: 'media',
    run: async(client, message, args) => {
        const mentionMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        const embed = new MessageEmbed()
        .setTitle('➥ DixPvP Network | Rank Media')
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('ORANGE')
        .setFooter(`Requested by ${message.author.tag}`)
         .setImage('')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addFields(
        {
          name: "Streamer",
          value: "→ 120 Followers\n → 10 | 15 Views"
        },
        {
          name: "MiniYT",
          value: "→ 75 Suscribes\n → 30 Views"
        },
        {
          name: "Youtuber",
          value: "→ 120 Suscribes\n → 50 Views"
        },
        {
          name: "Famous",
          value: "→ 600 Suscribes\n → 150 Views"
        },
        {
          name: "Famous",
          value: "→ 2000 Suscribes\n → 150 Views"
        },
        )
        await message.channel.send(embed)
        message.delete()
    }
}