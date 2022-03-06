const Discord = require("discord.js");

module.exports={
name: 'embed',
description:'Creates a custom embed',
usage: 'embed',
cooldown: 0,
run: async (client, message, args) => {
 
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send('tu no\'no tengo los permisos adecuados!')
      message.delete()
      message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor(`Embed Creator | 1/7`, message.author.displayAvatarURL({dynamic: true}))
        .setDescription('¿En qué canal quieres que esté tu inserción??\nPuede cancelar la configuración en cualquier momento diciendo \`cancel\`.')
        .setColor("ORANGE")
    );
    await startMessageCollectors(
      client,
      message,
      args,
      (m) => m.author.id == message.author.id && m.channel.id == message.channel.id
    );

    function startMessageCollectors(client, message, args, filter) {
      let channelCollector = new Discord.MessageCollector(
        message.channel,
        filter,
        { max: 7 }
      );

      channelCollector.on("collect", async (msg) => {
        let channel = await msg.mentions.channels.first();
        if (msg.content.toLowerCase() === "cancel") {
          msg.channel.send("La configuración de inserción ha sido cancelada.");
          channelCollector.stop();
          return;
        }
        if (!channel) {
          channel = msg.channel;
          if (!channel.permissionsFor(message.member).has("SEND_MESSAGES"))
            return message.channel.send("No puedes usar ese compañero de canal");
          return;
        } else {
          msg.channel.send(
            new Discord.MessageEmbed()
              .setAuthor(
                `Embed Creator | 2/7`,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .setDescription(
                `La inserción estará en ${channel}. ¿Qué título quieres para la inserción??`
              )
              .setColor("ORANGE")
          );
        }
        let titleCollector = new Discord.MessageCollector(
          message.channel,
          filter,
          { max: 7 }
        );
        titleCollector.on("collect", async (msg) => {
          let title = msg.content;
          if (msg.content.toLowerCase() === "cancel") {
            msg.channel.send("La configuración de inserción ha sido cancelada.");
            channelCollector.stop();
            return;
          }
          if (!title) {
            await msg.channel.send(`¡No especificaste un título! Cancelado.`);
            await titleCollector.stop();
          } else {
            msg.channel.send(
              new Discord.MessageEmbed()
                .setAuthor(
                  `Embed Creator | 3/7`,
                  message.author.displayAvatarURL({ dynamic: true })
                )
                .setColor("ORANGE")
                .setDescription(
                  `¡Ese es un buen título! ahora que color quieres?`
                )
            );
            titleCollector.stop();
          }
          let colorCollector = new Discord.MessageCollector(
            message.channel,
            filter,
            { max: 7 }
          );
          colorCollector.on("collect", async (msg) => {
            let duration = msg.content;
            let reg = new RegExp(/\#....?.?.?/g);
            if (!msg.content.match(reg)) {
              msg.channel.send("Ese es un color inválido...");
              colorCollector.stop();
              return;
            }
            if (msg.content.toLowerCase() === "cancel") {
              msg.channel.send("La configuración de inserción ha sido cancelada.");
              colorCollector.stop();
              return;
            } else {
              msg.channel.send(
                new Discord.MessageEmbed()
                  .setColor("ORANGE")
                  .setAuthor(
                    `Embed Creator | 4/7`,
                    message.author.displayAvatarURL({ dynamic: true })
                  )
                  .setDescription(
                    `el color sera ${duration}, ahora cual quieres que sea la descripcion?`
                  )
              );
              colorCollector.stop();
            }
            let descriptionCollector = new Discord.MessageCollector(
              message.channel,
              filter,
              { max: 999 }
            );
            descriptionCollector.on("collect", async (msg) => {
              let trueWinners = msg.content;

              if (msg.content.toLowerCase() === "cancel") {
                msg.channel.send("La configuración de inserción ha sido cancelada.");
                descriptionCollector.stop();
                return;
              } else {
                msg.channel.send(
                  new Discord.MessageEmbed()
                    .setColor("ORANGE")
                    .setAuthor(
                      `Embed Creator | 5/7`,
                      message.author.displayAvatarURL({ dynamic: true })
                    )
                    .setDescription(
                      `¡OH, qué buena descripción! Ahora, ¿cómo quieres que sea el pie de página??`
                    )
                );
                descriptionCollector.stop();
              }
              let footerCollector = new Discord.MessageCollector(
                message.channel,
                filter,
                { max: 7 }
              );
              footerCollector.on("collect", async (msg) => {
                let prize = msg.content;
                if (msg.content.toLowerCase() === "cancel") {
                  msg.channel.send("La configuración de inserción ha sido cancelada.");
                  footerCollector.stop();
                  return;
                }
                if (!prize) {
                  await msg.channel.send(
                    `¡No especificaste un pie de página! Cancelado!`
                  );
                  footerCollector.stop();
                  return;
                } else {
                  msg.channel.send(
                    new Discord.MessageEmbed()
                      .setColor("ORANGE")
                      .setAuthor(
                        `Embed Creator | 6/7`,
                        message.author.displayAvatarURL({ dynamic: true })
                      )
                      .setDescription(
                        `¡Qué buen pie de página! ¿Quieres una marca de tiempo? Escribe \`yes\` si lo hace, y escriba \`no\` si no lo haces.`
                      )
                  );
                  footerCollector.stop();
                }

                let timestampCollector = new Discord.MessageCollector(
                  message.channel,
                  filter,
                  { max: 7 }
                );
                timestampCollector.on("collect", async (msg) => {
                  if (msg.content.toLowerCase() === "cancel") {
                    msg.channel.send("La configuración de inserción ha sido cancelada.");
                    timestampCollector.stop();
                    return;
                  }
                  if (msg.content.toLowerCase() === "yes") {
                    await msg.channel.send(
                      new Discord.MessageEmbed()
                        .setColor("ORANGE")
                        .setAuthor(
                          `${message.author.username}'s Embed`,
                          message.author.displayAvatarURL({ dynamic: true })
                        )
                        .setDescription(
                          `Habrá una marca de tiempo. El inserto ha sido enviado ${channel.toString()}.`
                        )
                    );
                    timestampCollector.stop();
                    const embed2 = new Discord.MessageEmbed()
                      .setTitle(title)
                      .setColor(duration)
                      .setDescription(trueWinners)
                      .setFooter(prize)
                      .setTimestamp();
                    message.guild.channels.cache.get(channel.id).send(embed2);
                  } else if (msg.content.toLowerCase() === "no") {
                    msg.channel.send(
                      new Discord.MessageEmbed()
                        .setColor("ORANGE")
                        .setAuthor(
                          `${message.author.username}'s Embed`,
                          message.author.displayAvatarURL({ dynamic: true })
                        )
                        .setDescription(
                          `No habrá marca de tiempo. El inserto ha sido enviado ${channel}.`
                        )
                    );
                    const embed = new Discord.MessageEmbed()
                      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                      .setTitle(title)
                      .setColor(duration)
                      .setDescription(trueWinners)
                      .setFooter(prize);
                    message.guild.channels.cache.get(channel.id).send(embed);
                    timestampCollector.stop();
                  }
                });
              });
            });
          });
        });
      });
    }
  },
};