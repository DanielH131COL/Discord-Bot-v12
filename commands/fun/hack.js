const Discord = require("discord.js");

module.exports = {
    name: "hack",
    description: "hack a user",
    cooldown: 0,
    run: async(client, message, args) => {
    
    const eMails = [
        "dixpvp@gmail.com",
        "ontopl@outlook.com",
        "dixpvpforever@hotmail.com",
        "dixpvpstore@reapernt.co",
        "lasdivinasxdn@gmail.com",
        "minecraft123@hotmail.com",
        "porheads@pogmail.com"
    ]
    const emailRandom = Math.floor(Math.random()* eMails.length)

    const password = Math.random().toString(20).slice(2) + Math.random().toString(20).slice(2);

        const taggedUser = message.mentions.users.first();
        if (!taggedUser) {
            return message.channel.send('Por favor mencione a alguien para hackear!');
        }
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${taggedUser.tag} Fue hackeado!`, taggedUser.displayAvatarURL({dynamic: true}))
        .setDescription(`**__Información encontrada!__**\n> Correos electrónico: ${eMails[emailRandom]}\n> Contraseña: ${password}\n`)
        .setColor(message.guild.me.displayHexColor)
        .setFooter('totalmente real')

        message.channel.send(`Hacking  **${taggedUser.tag}***...`);
       
            const fMsg = await message.channel.send(`Hackeado con éxito **${taggedUser.tag}**! Obtención de información...`)  
            setTimeout(() => {
                fMsg.edit('Información encontrada', embed)
            }, 5000);
            


    }
}