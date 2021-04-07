const Discord = require("discord.js");
const moment = require("moment");

exports.run = (client, message, args, ops) => {
  
message.delete();
  
const Error = new Discord.MessageEmbed()
.setAuthor(`| ${client.user.tag}`, client.user.displayAvatarURL)
.setDescription("You do not have the authorization to operate this command.")
.setColor(ops.color)
.setFooter("HAPPY")
  
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(Error).then(m => m.delete(5000))
  
const user = message.mentions.users.first() || message.guild.members.get(args[0]);
// Parse Amount
  
const NoArgs = new Discord.MessageEmbed()
.setDescription("~prune [UserID] [#]")
.setColor(ops.color)
.setAuthor(`| ${client.user.tag}`, client.user.displayAvatarURL)
.setFooter("HAPPY")

if (!user){
message.channel.send(NoArgs).then(m => m.delete(5000));
}

const NoAmount = new Discord.MessageEmbed()
.setDescription(`Choose a number between \`1\` - \`100\` to clear from **${user.user.tag}** in ${message.channel}`)
.setColor(ops.color)
.setAuthor(`| ${client.user.tag}`, client.user.displayAvatarURL)
.setFooter("HAPPY")
  
const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])

if (!amount) {
message.channel.send(NoAmount).then(m => m.delete(5000)); 
}

//Calling the amount
let reason = args.slice(2).join(" ");
if(!reason) reason = "Unacceptable Chatting";

//Setting the reason

//If no user it'll return an embed

// Fetch 100 messages (will be filtered and lowered up to max amount requested)

if (isNaN(amount)){ 
message.channel.send(NoAmount).then(m => m.delete(5000));
}
  
message.channel.fetchMessages({
 limit: 100,
}).then((messages) => {
 if (user) {
 const filterBy = user ? user.id : client.user.id;
 messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
 }
 message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
});
  
const Done = new Discord.MessageEmbed() //Creating the embed
.setDescription(`\`${args[1]}\` messages have been pruned from **${user.user.tag}** in ${message.channel}`) //Setting the description
.setColor(ops.color) //Setting the color
.setAuthor(`| ${client.user.tag}`, client.user.displayAvatarURL) //Setting the title
.setFooter("HAPPY") //Setting the footer

const LogsMsg = new Discord.MessageEmbed()
.setAuthor(`| ${client.user.tag }`, client.user.displayAvatarURL)
.setDescription(`**User** ${user.user.tag}\n**Amount** ${args[1]}\n**Reason** ${reason}\n**Moderator** ${message.author.tag}\n**Channel** ${message.channel}\n**At** ${moment(message.createdAt).format("lll", Date.now())}`)
.setColor(ops.color)
.setFooter("HAPPY")

let LogsChan = message.guild.channels.find(c => c.name == "message-reports") //Searching for the channel

message.channel.send(Done).then(m => m.delete(5000)) //Sending the notification if successfully cleared
  
LogsChan.send(LogsMsg)
}
