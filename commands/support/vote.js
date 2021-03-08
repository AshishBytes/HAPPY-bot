const Discord = require('discord.js');
exports.run = (client, message, args) =>{
    let serverembed = new Discord.MessageEmbed()
        .setColor("#00FFFF")
        .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
        .setURL(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
        .addField(`Vote`, `[Vote](https://top.gg/bot/810825174990454794/vote)`, true)
        .setFooter(`HAPPY | Please vote me for after every 12 hours`);

    message.channel.send(serverembed);    

}
