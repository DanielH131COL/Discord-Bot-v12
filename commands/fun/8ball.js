const Discord = require('discord.js')
module.exports = {
    name: '8ball',
    description: 'ask 8ball ANYTHING!',
    usage: '8ball <message>',
    cooldown: 0,
    run: async(client, message, args) => {
        let replies = ["Si.", "No.", "No sé.", "Pregunta de nuevo más tarde", "no cuentes con eso.", "Es cierto.", "Es decididamente así.", "Más probable.", "Mi respuesta es no.", "Mis fuentes dicen que no.", "Perspectiva no tan buen@.", "Perspectiva bueno", "Responder nebuloso, intentar otra vez.", "Las señales apuntan a sí.", "Muy dudoso", "Sin duda", "Sí definitivamente", "Puedes confiar en ello."];

        let result = Math.floor((Math.random() * replies.length));

        let question = args.join(" ");

        if(!question) return message.channel.send('tienes que hacer una pregunta...  ')

        if(question) {
        const embed = new Discord.MessageEmbed()
        .setTitle(`8ball ha respondido! `)
        if (question.endsWith("?")) embed.addField(`Pregunta: `, `${question}`, true)
        else if (!question.endsWith("?")) embed.addField(`Pregunta: `, `${question}?`, true)
        embed.addField(`Respuesta: `, `${replies[result]}`)
        embed.setColor('ORANGE')
        message.channel.send(embed)
        }


    }
    
}