const Discord = require('discord.js');
exports.run = (client, message, args) =>{
    let serverembed = new Discord.MessageEmbed()
        .setColor("#00FFFF")
        .addField(`Server`, `[Server Link](currently nothing)`, true)
        .setFooter(`HAPPY`);

    message.channel.send(serverembed);    

}
