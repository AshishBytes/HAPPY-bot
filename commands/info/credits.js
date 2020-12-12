const Discord = require('discord.js');
const osutils = require('os-utils');
exports.run = (client, message, args) =>{
    let serverembed = new Discord.MessageEmbed()
        .setColor("#00FFFF")
        .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
        .setURL(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
        .setTimestamp()
        .addField("HAPPY", "Show the bot's creadits.")
        .addField("-------------------------------------------------------------------------------","----------------------------------------------------------------------------")
        .setField("BIG THANKS FOR MUSIC");
	.addField(`GITHUB`, `[LINK](https://github.com/ZerioDev/Music-bot)`, true):
	.addField(`SERVER`, `[LINK](https://discord.gg/DKXWFfCAEE)`, true):
	.setFooter("HAPPY");

    message.channel.send(serverembed);    

}
