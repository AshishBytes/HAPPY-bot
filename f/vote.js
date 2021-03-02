const Discord = require('discord.js');
exports.run = (client, message, args) =>{
    let serverembed = new Discord.MessageEmbed()
        .setColor("#00FFFF")
        .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
        .setURL(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
        .addField(`Vote`, `[Vote](https://top.gg/bot/722790472279523339/vote)`, true)
        .setFooter(`HAPPY`);

    message.channel.send(serverembed);    

}
