const Discord = require('discord.js');
exports.run = (client, message, args) =>{
    let serverembed = new Discord.MessageEmbed()
        .setColor("#00FFFF")
        .addField(`Vote`, `[Vote](https://top.gg/bot/722790472279523339/vote)`, true)
        .setFooter(`HAPPY`);

    message.channel.send(serverembed);    

}
