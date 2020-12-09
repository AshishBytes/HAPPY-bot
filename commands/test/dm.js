const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  
if(message.author.id != "707503577731432529") return message.channel.send("<@707503577731432529>")
  message.channel.send(`Serving ${client.guilds.size} servers`)
  message.channel.send(client.guilds.map(g=>g.name).join('\n'))
  }


module.exports.help = {
  name: "dm"
}
