const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {
  if (!message.mentions.users.first())
    return message.reply("You need to mention someone to spank them");
  if (!message.channel.nsfw)
    return message.reply("No NO NO, NSFW is not enabled in this channel");
  if (message.mentions.users.first().id === "648468795857436691")
    return message.reply(
      "You can't spank my Dev bro.:facepalm: He will spank your ass off >:3"
    );
  const { body } = await superagent.get("https://nekos.life/api/v2/img/spank");

  const embed = new Discord.MessageEmbed()
    .setColor("AQUA")
    .setTitle(
      `${
        message.mentions.users.first().username
      }, you got spanked in da butt by ${message.author.username} >:3`
    )
    .setImage(body.url)
    .setFooter(`HAPPY`);
  message.channel.send({ embed });
};

module.exports.help = {
  name: "spank",
  description: "This command is used for generating spank images.",
  usage: "d!spank <mentions>",
  accessableby: "Member",
  aliases: [],
};
