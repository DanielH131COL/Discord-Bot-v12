const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
 
module.exports = {
  name: "suggest",
  category:"suggestion",
  
  run: async (client, message, args) => {
   
  let channel = await db.fetch(`suggestion_${message.guild.id}`);
    if (channel === null) return;
  
  const suggestionQuery = args.join(" ");
  if(!suggestionQuery) return message.reply("Por favor sugiera algo.");
    
  const embed = new MessageEmbed()
         
       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
       .setDescription(`${suggestionQuery}`)
       .setColor("#D35400")
       .setFooter("status: Pending")
       .setTimestamp();
       
    const done = new MessageEmbed()
       .setDescription(`📘 | Your suggestion is sent here, <#${channel}>\n\nNote: Agreed to receive a DM in response to your suggestion!`)
       .setColor("#D35400")
       
    message.channel.send(done)
    
    let msgEmbed = await message.guild.channels.cache.get(channel).send(embed)
    
    await msgEmbed.react("✅")
    await msgEmbed.react("❌")
  }
}