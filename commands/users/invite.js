const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "invite",
    run: (client, message) => {
        const embed = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('ORANGE')
        .setFooter(`Requested by ${message.author.tag}`)
        .setImage('')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(`[Invite Link Discord Bot](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
        message.channel.send(embed)
    }
}