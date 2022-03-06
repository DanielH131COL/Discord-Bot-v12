const Discord = require('discord.js')

module.exports = {
    name: 'gamer',
    description: 'Look how epic gamer you are',
    usage: 'gamer [@user] ',
    aliases: ['gamer'],
    cooldown: 0,
    run:async (client, message, args) => {

        const bots = message.guild.members.cache.filter(member => member.user.bot)

        let rate = (Math.floor(Math.random() * Math.floor(100)));

        let user = message.mentions.users.first() || message.author || message.users.id
    
        
        const GamerEmbed = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setTitle(`${user.tag}'s Gamer`)
        .setDescription(`${user} es ${rate}% gamer`)
        .setTimestamp()
        .setFooter('nice')

        message.channel.send(GamerEmbed)
       
      }

    }