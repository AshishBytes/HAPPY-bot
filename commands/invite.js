const { RichEmbed, Client, uptime, client } = require("discord.js");

exports.run = (bot, message, args) => {
        let embed = new RichEmbed()
        .addField(`INVITE ME ON YOUR SERVER :fire:`, `[Invite link](https://top.gg/bot/722790472279523339/invite)`, true)
        .setFooter("HAPPY")
        .setTimestamp()
        .setColor(`#11FBFF`)
        message.channel.send(embed);
}
