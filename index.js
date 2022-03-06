const Discord = require("discord.js");

const fs = require("fs");
const moment = require('moment');
const client = new Discord.Client({
    disableEveryone: true,
  });
const config = require('./config.json');
const token = config.token;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
client.prefix = config.prefix;

["handlers", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on('guildMemberAdd', member => {
  if (!member.guild) return;
  let guild = member.guild
  let channel = guild.channels.cache.find(c => c.name === "NameChannel");

  let membercount = guild.members
  if (!channel) return;
  
  let embed = new Discord.MessageEmbed() 
    .setColor("ORANGE") 
    .setTitle("➥ Welcome")
    .setDescription(`Hi ${member.user.username} Welcome to **ServerName!** \n\n **User Informationo**\n > User: ${member.user.tag}\n > ID: ${member.user.id}`)
    .setFooter(`Please read the Rules very well so as not to be sanctioned.`);
  channel.send(embed);
});

client.on('guildMemberRemove', member => {
  if (!member.guild) return;
  let guild = member.guild
  let channel = guild.channels.cache.find(c => c.name === "NameChannel");

  let membercount = guild.members
  if (!channel) return;
  
  let embed = new Discord.MessageEmbed() 
    .setColor("ORANGE") 
    .setTitle("➥ Godbye")
    .setDescription(`The player ${member.user.username} has withdrawn from **ServerName!**`)
  .setFooter(`We will wait for you here again.`);
  channel.send(embed);
});

client.login(token);