const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = (client, message, args) => {
  let dfgrdgdfgdf = new Discord.MessageEmbed()
    .setDescription(`<a:yes:815973942665674774> **Lockdown lifted**`)
    .setColor("GREEN");
  let notice3 = new Discord.MessageEmbed()
    .setDescription(
      `<a:cross1:815954673169072138> **I don't have permission to manage channel!**`
    )
    .setColor("RED");
  if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
    return message.channel
      .send(notice3)
      .then((msg) => msg.delete({ timeout: 5000 }));
  if (!client.lockit) client.lockit = [];
  let time = args.join(" ");
  let validUnlocks = ["release", "unlock"];
  let mmqembed = new Discord.MessageEmbed()
    .setDescription(
      `<a:cross1:815954673169072138> ${message.author.username}, Missing Permission`
    )
    .setColor("RED");
  if (!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.channel
      .send(mmqembed)
      .then((msg) => msg.delete({ timeout: 5000 }));
  let ddd = new Discord.MessageEmbed()
    .setDescription(
      `<a:cross1:815954673169072138> **You must set a duration for the lockdown in either hours, minutes or seconds**`
    )
    .setColor("RED");
  if (!time) return message.channel.send(ddd);

  if (validUnlocks.includes(time)) {
    message.channel
      .createOverwrite(message.guild.id, {
        SEND_MESSAGES: null,
      })
      .then(() => {
        message.channel.send(dfgrdgdfgdf);
        clearTimeout(client.lockit[message.channel.id]);
        delete client.lockit[message.channel.id];
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    message.channel
      .createOverwrite(message.guild.id, {
        SEND_MESSAGES: false,
      })
      .then(() => {
        let bsuembed = new Discord.MessageEmbed()
          .setDescription(
            `<a:yes:815973942665674774> Locked the channel down for **${ms(
              ms(time),
              { long: true }
            )}**`
          )
          .setColor("AQUA");

        message.channel
          .send(bsuembed)
          .then(() => {
            client.lockit[message.channel.id] = setTimeout(() => {
              message.channel
                .createOverwrite(message.guild.id, {
                  SEND_MESSAGES: true,
                })
                .then(message.channel.send(dfgrdgdfgdf))
                .catch(console.error);
              delete client.lockit[message.channel.id];
            }, ms(time));
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }
};

module.exports.help = {
  name: "lockchannel",
  description: "This command is used for locking the channels.",
  usage: "d!lockchannel <duration>",
  accessableby: "Manage Channels",
  aliases: [],
};
