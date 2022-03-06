const {MessageEmbed, Role} = require('discord.js')

module.exports = {
    name: 'user',
    run: async(client, message, args) => {
        const mentionMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        const embed = new MessageEmbed()
        .setAuthor(mentionMember.user.tag, mentionMember.user.displayAvatarURL({ dynamic: true }))
        .setColor('ORANGE')
        .setThumbnail(mentionMember.user.displayAvatarURL({dynamic: true}))
        .addFields(
            {
                name: "Cuenta creada el: ",
                value: mentionMember.user.createdAt.toLocaleString(),
                inline: true
            },
            {
                name: "Entro al servidor el: ",
                value: mentionMember.guild.joinedAt.toLocaleString(),
                inline: true
            },
            {
                name: "User ID: ",
                value: mentionMember.id,
                inline: true
            },
            {
                name: "es un bot?",
                value: mentionMember.user.bot,
                inline: true
            },
            {
                name: "Avatar URL: ",
                value: `[Avatar Link](${mentionMember.user.displayAvatarURL({dynamic: true})})`,
                inline: true
            },
            {
                name: "Bosteo desde:",
                value: mentionMember.premiumSince || 'User dont have boost in this server',
                inline: true
            },
            {
                name: "Roles del usuario: ",
                value: mentionMember.roles.cache.map(role => role.toString()).join(" ,"),
                inline: true
            }
        )
        await message.channel.send(embed)
        message.delete()
    }
}