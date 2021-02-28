const request = require("request");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  request("http://edgecats.net/random", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      let emb = new Discord.MessageEmbed()
        .setImage(body)
        .setColor("AQUA")
        .setTitle("Your random cat here")
        .setFooter(
          `HAPPY`
        );

      message.channel.send(emb);
    }
  });
};

module.exports.help = {
  name: "cat",
  description: "This command is used for posting cat's images randomly.",
  usage: "d!cat",
  accessableby: "Members",
  aliases: [],
};
