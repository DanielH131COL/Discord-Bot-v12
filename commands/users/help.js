const {MessageEmbed, Role} = require('discord.js')

module.exports = {
    name: 'help',
    run: async(client, message, args) => {
        const mentionMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        const embed = new MessageEmbed()
        .setTitle('➥ DixPvP Network | Help Panel')
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('ORANGE')
        .setFooter(`Requested by ${message.author.tag}`)
         .setImage('')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addFields(
        {
          name: "🔨 My current prefix",
          value: "`!`"
        },
        {
          name: "General Commands",
          value: "→ `help` | `suggest` | `binfo` | `server` | `ip` | `twitter` | `media` | `twitter` | `store` | `ts` | `ping`"
        },
        {
          name: "🤣 Fun Commands",
          value: "→ `8ball` | `gamer` | `gay` | `hack` | `wasted` | `ascii`"
        },
        {
          name: "🛠 Admin Commands",
          value: "→ `embed` | `poll` | `clear`"
        },
        {
          name: "Giveaway Commands",
          value: "→ `gstart` | `end` | `reroll`"
        },
        {
          name: "🎶 Music Commands",
          value: "→ `play` | `pause` | `resume` | `skip` | `volumen` | `stop` | `queue`"
        },
        )
        await message.channel.send(embed)
        message.delete()
    }
}