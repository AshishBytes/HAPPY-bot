const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, msg, args) => {
  if(!msg.member.hasPermission("MANAGE_GUILD")) return msg.channel.send("You don't have permissions to set prefix!");
  if(!args[0]) return msg.channel.send("Please specify a prefix!");
  
  let crafty = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  crafty[msg.guild.id] = {
    prefix: args[0]
  }
  
  fs.writeFile("./prefixes.json", JSON.stringify(crafty), (err) => {
     if(err) console.log(err);
  })
  
  msg.channel.send(`Prefix has been set to ${args[0]}`);
}//w ada nih project sky craft :V // buat apaan? :V
//w soalny disuruh jaga dia kgk on sampe 4 bln an//pantes w spam pake bot pun ga dijawab,//gmn loop ne nih?
exports.conf = {
  aliases: ['prf']
}
exports.help = {
  name: 'prefix'
}
