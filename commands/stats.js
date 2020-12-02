const Discord = require('discord.js');
const cpu = require('pidusage');
  cpu(process.pid, async (stats, err) => {
bot.on("message', message => {
    if (message.author.id) return; //ignore bots 
const embed = new Discord.RichEmbed()
.setDescription(`
**UPTIME**
${ms(client.uptime)}

**PING** 
${client.ping}

**RAM USAGE**
${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB

**USERS**
${client.users.cache.size}

**GUILDS**
${client.guilds.cache.size}

**CHANNELS**
${client.channels.cache.size}

**CPU USAGE**
${Math.round('stats.cpu')}

**STATUS**
${client.user.presence.status}

**GAME**
${client.user.presence.game}

**DEPENDENCIES COUNT**
${Object.keys(require('../package').dependencies).length}
`)
message.channel.send(embed)
});
} catch (err) {
message.channel.send('error' + err).catch();
};
