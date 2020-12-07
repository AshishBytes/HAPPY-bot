const Discord = require('discord.js');
exports.run = (client, message, args) =>{
    let serverembed = new Discord.MessageEmbed()
        .setColor("#00FFFF")
        .addField(`Server`, `[Server Link](https://discord.gg/qZuGW4f6yv)`, true)
        .setFooter(`HAPPY`);

    message.channel.send(serverembed);    

}
