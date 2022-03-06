const discord = require("discord.js");

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Ban anyone with one shot whithout knowing anyone xD",
  usage: "ban <@user> <reason>",
  run: async (client, message, args) => {
    
    const target = message.mentions.members.first()
    
    const reason = args.slice(1).join(" ")
    
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`You don't have enough powers to ban someone`)
    
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply(`I have no powers to ban someone.`)
    
    if(!args[0]) return message.reply(`Mention someone to ban`)
    
    if(!target) return message.reply(`I can't find that member`)
    
    if(target.roles.highest.position >= message.member.roles.highest.position || message.author.id !== message.guild.owner.id) {
      return message.reply(`They have more power than you`)
    }
    
    if(target.id === message.author.id) return message.reply(`I can't ban you like you're the boss`)
    
    if(target.bannable) {
      let embed = new discord.MessageEmbed()
      .setColor("#D35400")
      .setDescription(`Banned \`${target}\` for \`${reason || "no reason provided"}\``)
      
      message.channel.send(embed)
      
      target.ban()
      
      message.delete()
      
    } else {
      return message.reply(`I can't ban them, make sure my role is above theirs.`)
    }
    return undefined
  }
};