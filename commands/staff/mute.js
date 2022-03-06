const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  aliases: ["mutes", "muted"],
  category: "moderation",
  description: "muet",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("sorry, you need permission to mute someone");
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I don't have permission to mute");
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("Please mention members to mute");
    }
    if (user.id === message.author.id) {
      return message.channel.send("I can't silence you because you are the author of the message.");
    }
    let reason = args.slice(1).join("");

    if (!reason) {
      return message.channel.send("lease give some reason to silence");
    }

    const vrole = user.roles.cache

    let muterole = message.guild.roles.cache.find(x => x.name === "Muted");

    if (!muterole) {
      return message.channel.send("please create role name with muted");
    }
    
    await user.roles.remove(vrole);
    await user.roles.add(muterole);

    await message.channel.send(
      `you muted ${message.mentions.users.first().username} for ${reason}`
    );

    user.send(`they silence you ${message.guild} by ${reason}`
    );
  }
};