const Discord = require('discord.js');
exports.run = (client, message, args) =>{
    let serverembed = new Discord.MessageEmbed()
        .setColor("#00FFFF")
        .setThumbnail(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
        .setURL(client.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
        .addField(`Invite`, `[Invite Link](https://discord.com/api/oauth2/authorize?client_id=810825174990454794&permissions=37092672&scope=bot)`, true)
	.addField(`Vote`, `[Vote Link](https://top.gg/bot/722790472279523339/vote)`, true)
	.addField(`Server`, `[Server Link](https://discord.gg/qZuGW4f6yv)`, true)
        .setFooter(`HAPPY`);

    message.channel.send(serverembed);    

}
