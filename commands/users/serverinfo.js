const { MessageEmbed, NewsChannel } = require('discord.js')

module.exports = {
    name: 'server',
    run: async(client, message, args) => {
        const online = message.guild.members.cache.filter(m => m.user.presence.status == 'online').size
        const idle = message.guild.members.cache.filter(m => m.user.presence.status == 'idle').size
        const dnd = message.guild.members.cache.filter(m => m.user.presence.status == 'dnd').size
        const embed = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor('ORANGE')
        .setFooter(`Requested by ${message.author.tag}`)
        .setImage('')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addFields(
            {
                name: 'identificación del servidor: ',
                value: message.guild.id,
                inline: true
            },
            {
                name: "Servidor creado el: ",
                value: message.guild.createdAt.toLocaleString(),
                inline: true
            },
            {
                name: "Canales:",
                value: `**${message.guild.channels.cache.filter(c => c.type == 'text').size}** text | **${message.guild.channels.cache.filter(c => c.type == 'voice').size}** voice | **${message.guild.channels.cache.filter(c => c.type == 'category').size}** category`
            },
            {
                name: "Propiedad de: ",
                value: `<@${message.guild.ownerID}>`,
                inline: true
            },
            {
                name: `miembros: `,
                value: `(${message.guild.memberCount})`,
                inline: true
            },
            {
                name: 'Region: ',
                value: 'USA',
                inline: true
            },
            {
                name: "Nivel de verificación: ",
                value: message.guild.verificationLevel,
                inline: true
            },
            {
                name: "Total Boost: ",
                value: `${message.guild.premiumSubscriptionCount} Boost`,
                inline: true
            },
            {
                name: "Boost Level: ",
                value: message.guild.premiumTier,
                inline: true
            },
            {
                name: "Emojis: ",
                value: message.guild.emojis.cache.size >= 1 ? `There are ${message.guild.emojis.cache.size} emojis!` : 'There are no emojis :(',
                inline: true
            }
        )
        .setTimestamp();
        await message.channel.send(embed)
        message.delete()
    }
}