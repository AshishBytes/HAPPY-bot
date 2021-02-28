const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {
  if (!message.channel.nsfw)
    return message.reply("No NO NO, NSFW is not enabled in this channel");

  const { body } = await superagent.get("https://nekos.life/api/v2/img/ngif");

  const embed = new Discord.MessageEmbed()
    .setColor("AQUA")
    .setTitle(`OwO, Heres your Neko Gif`)
    .setImage(body.url)
    .setFooter(`© Draconian Workshop`);
  message.channel.send({ embed });
};

module.exports.help = {
  name: "ngif",
  description: "This command is used for generating ngif.",
  usage: "d!ngif",
  accessableby: "Members",
  aliases: [],
};
