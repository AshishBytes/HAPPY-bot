const Discord = require('discord.js');
    let serverembed = new Discord.MessageEmbed()
        .setColor("#00FFFF")
        .addField(`Memory`, `${memory}`, false)
        .addField(`Servers`, `${servers}`, true)
        .addField(`Users`, `${users}`, true)
        .addField(`Invite`, `[Invite Me](https://top.gg/bot/722790472279523339/invite)`, true)
        .addField(`Vote`, `[Vote Me](https://top.gg/bot/722790472279523339/invite)`, true)
        .setFooter(`Uptime: ${uptime}`);

    message.channel.send(serverembed);    

}
