const Discord = require("discord.js");
const config = require("../../config.json")
module.exports = {
    name: "poll",
    category: "admins",
    description: "Creates a poll",
    usage: "poll <POLLTEXT>",
    run: async (client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.reply(`No tienes permiso para ejecutar este comando.`)
         if (!args[0]) return message.reply('Introduce una pregunta para la encuesta!');
        let msg = args.join(' ');
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setImage('')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField("\u200b", msg)
        .setFooter(`Hecha por: ${message.author.username}`, message.member.user.displayAvatarURL({ dynamic: true }));
        let tempmsg = await message.channel.send(new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setFooter(client.user.username, config.AVATARURL));
        await message.delete();
        await tempmsg.react("✅");
        await tempmsg.react("❌");
        await tempmsg.edit(embed);
        // await tempmsg.react("🟠"); Circulos
        // await tempmsg.react("🟡");
        //
        // await tempmsg.react("✅"); Si no
        // await tempmsg.react("❌");
        // await tempmsg.react("🟢");
    }
}