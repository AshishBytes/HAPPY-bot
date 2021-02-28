const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {
  const { body } = await superagent.get("https://nekos.life/api/v2/img/smug");

  const embed = new Discord.MessageEmbed()
    .setColor("AQUA")
    .setImage(body.url)
    .setFooter(`HAPPY`);
  message.channel.send({ embed });
};

module.exports.help = {
  name: "smug",
  description: "This command is used for generating smug.",
  usage: "d!smug",
  accessableby: "Member",
  aliases: [],
};
