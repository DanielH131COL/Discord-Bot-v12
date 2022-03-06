const Discord = require("discord.js");
const bot = new Discord.Client();
module.exports = {
  name: "purge",
  category: "moderation",
  aliases: ['clear', 'delete', 'prune'],

  async run(bot, message, args) {
let prefix = "!"
 try { 
 
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("no tienes **MANAGE_MESSAGES** Premssions para usar este comando.");
  if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("no tengo **MANAGE_MESSAGES** permisos para usar este comando.");

const commands = [
`bots\` - Eliminar mensajes enviados por bots.`, 
`humans\` - Eliminar mensajes enviados por humanos.`, 
`embeds\` - Eliminar mensajes que contengan inserciones enriquecidas.`, 
`files\` - Eliminar mensajes que contengan archivos/imágenes/adjuntos.`, 
`mentions\` - Eliminar mensajes que contengan menciones de miembro/usuario/canal/rol.`, 
`pins\` - Eliminar mensajes que están fijados.`, 
`text\` - Eliminar mensajes que solo contienen texto.`, 
`match\` <text> - Eliminar mensajes que contengan texto.` , 
`not\` <text> - Eliminar mensajes que no contengan texto.`, 
`startswith\` <text> - Eliminar mensajes comienza con texto.`, 
`endswith\` <text> - Eliminar mensajes termina con texto.`
]

const embd = new Discord.MessageEmbed() 
.setColor("AQUA") 
.setTitle("Purge") 
.setDescription(`Eliminar una cantidad de mensajes de un canal. (Ignora los mensajes anclados y el límite es 100)`) 
.addField("Usage", `\`${prefix}purge <amount>\` - Deliminar una serie de mensajes.\n\`${prefix}purge <amount> --${commands.join(`\n\`${prefix}purge <amount> --`)}`) 
.setFooter(`${prefix}purge, ${prefix}clear, ${prefix}delete, ${prefix}prune`) 




if(!args[0] || !args.length) return message.channel.send(embd);
let amount = Number(args[0],10) || parseInt(args[0]);
if(isNaN(amount) || !Number.isInteger(amount)) return message.channel.send("Please enter a number of messages to purge.");
if(!amount || amount < 2 || amount > 100) return message.channel.send("Please enter a number of message between 2 and 100.")
if(!args[1]) {

try {
  await message.delete()
await message.channel.bulkDelete(amount).then(async (m) => { 
  
   let embed = new Discord.MessageEmbed()
  .setColor('#00FFF7')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:4000})); 
})

   } catch (e) { 
     console.log(e) 
     message.channel.send(`You can only delete the messages which are not older than 14 days.`)
     

   }

} else if(args[1]) {
  let msg;
  let data;
  let embed;
  switch(args[1]) {
    case "--bots":
     msg = await message.channel.messages.fetch({limit: amount})
    data = []
    msg.map(m => m).forEach(ms => {
      if(ms.author.bot && !ms.pinned) data.push(ms)
    })
   
   try {
     await message.delete()
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
      embed = new Discord.MessageEmbed()
  .setColor('#00FFF7')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`You can only delete the messages which are not older than 14 days.`) 
   }

      break;
     case "--humans":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
      if(!ms.author.bot && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
      embed = new Discord.MessageEmbed()
  .setColor('#00FFF7')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`You can only delete the messages which are not older than 14 days.`) 
   }

      break;
case "--embeds":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
      if(ms.embeds.length && !ms.pinned) data.push(ms)
    })
    
   try {
     
      await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('#00FFF7')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`You can only delete the messages which are not older than 14 days.`) 
   }

      break;
case "--files":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
      if(ms.attachments.first() && !ms.pinned) data.push(ms)
    })
    
   try {
  
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('#00FFF7')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`You can only delete the messages which are not older than 14 days.`) 
   }

      break;case "--text":
    msg = await message.channel.messages.fetch({limit: amount})
    data = []
    msg.map(m => m).forEach(ms => {
      if(!ms.attachments.first() && !ms.embeds.length && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('#00FFF7')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`You can only delete the messages which are not older than 14 days.`) 
   }

      break;
  case "--mentions":
     msg = await message.channel.messages.fetch({limit: amount})
  data = []
    msg.map(m => m).forEach(ms => {
      if((ms.mentions.users.first() || ms.mentions.members.first() || ms.mentions.channels.first() || ms.mentions.roles.first())&& !ms.pinned) data.push(ms)
    })
    
   try {
 
       await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('#00FFF7')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`You can only delete the messages which are not older than 14 days.`) 
   }

      break;
case "--pins":
    msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
      if(ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
      embed = new Discord.MessageEmbed()
  .setColor('#00FFF7')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`You can only delete the messages which are not older than 14 days.`) 
   }

      break;
case "--match":
     msg = await message.channel.messages.fetch({limit: amount})
    data = []
    msg.map(m => m).forEach(ms => {
if(!args[2]) return message.channel.send(embd);
      if(ms.content.includes(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
    })
    
   try {
    
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('#00FFF7')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`You can only delete the messages which are not older than 14 days.`) 
   }

      break;
case "--not":
    msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
if(!args[2]) return message.channel.send(embd);
      if(!ms.content.includes(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('#00FFF7')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`You can only delete the messages which are not older than 14 days.`) 
   }

      break;
case "--startswith":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
if(!args[2]) return message.channel.send(embd);
      if(ms.content.startsWith(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('#00FFF7')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`You can only delete the messages which are not older than 14 days.`) 
   }

      break;
case "--endswith":
     msg = await message.channel.messages.fetch({limit: amount})
     data = []
    msg.map(m => m).forEach(ms => {
if(!args[2]) return message.channel.send(embd);
      if(ms.content.endsWith(args.slice(2).join(" ")) && !ms.pinned) data.push(ms)
    })
    
   try {
     
     await message.channel.bulkDelete(data.length ? data : 1, true).then(async (m) => {
      
       embed = new Discord.MessageEmbed()
  .setColor('#00FFF7')
  .setDescription(`✅  Cleared **${m.size}**/**${amount}** messages!`);

   message.channel.send(embed).then(msg => msg.delete({timeout:50000})); 
      })
      
   } catch (e) { 
     console.log(e)
   message.channel.send(`You can only delete the messages which are not older than 14 days.`) 
   }

      break;
default:
return message.channel.send(embd) 
break;
}

} else {
 return message.channel.send(`An error occoured.`)
}
} catch (error) {
  console.log(error)
  message.channel.send(`An error occurred: \`${error}\``)
}


}
}