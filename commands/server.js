const Discord = require('discord.js');
exports.run = (client, message, args) =>{
    let serverembed = new Discord.MessageEmbed()
        .setColor("#00FFFF")
        .addField(`Invite`, `[Invite Link](https://top.gg/bot/722790472279523339/invite)`, false)
	      .addField(`Vote`, `[Vote Link](https://top.gg/bot/722790472279523339/vote)`, false)
	      .addField(`Server`, `[Server Link](currently nothing)`, true)
        .setFooter(`HAPPY`);

    message.channel.send(serverembed);    

}
