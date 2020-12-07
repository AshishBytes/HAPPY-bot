const Discord = require('discord.js');
exports.run = (client, message, args) =>{
    let serverembed = new Discord.MessageEmbed()
        .setColor("#00FFFF")
        .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
        .setURL(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))

        .addField(`Server`, `[Server Link](https://discord.gg/qZuGW4f6yv)`, true)
        .setFooter(`HAPPY`);

    message.channel.send(serverembed);    

}
