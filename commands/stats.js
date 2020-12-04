const Discord = require('discord.js');
exports.run = (client, message, args) =>{
    let serverembed = new Discord.MessageEmbed()
        .setColor("#00FFFF")
       /// .addField(`Memory`, `${memory}`, true)
        .addField(`Servers`, `${servers}`, true)
        .addField(`Users`, `${users}`, true)
        .addField(`Invite`, `[Invite Me](https://top.gg/bot/722790472279523339/invite)`, true)
        .addField(`Vote`, `[Vote Me](https://top.gg/bot/722790472279523339/invite)`, true)
        .setFooter(`Uptime: ${uptime}`);

    message.channel.send(serverembed);    

}
