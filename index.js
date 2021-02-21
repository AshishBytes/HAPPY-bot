const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client({ disableMentions: 'everyone' });
const { Player } = require('discord-player');
require("./ExtendedMessage");
const player = new Player(client, {
	leaveOnEnd: true,
	leaveOnStop: true,
	leaveOnEmpty: false,
	timeout: 120000,
        volume: 150,
        quality: 'high',
});
client.player = player;
client.config = require('./config/bot.json');
client.emotes = require('./config/emojis.json');
client.filters = require('./config/filters.json');
client.commands = new discord.Collection();
client.aliases = new discord.Collection();

                    /////////////////////////////////

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading event ${eventName}`);
        client.on(eventName, event.bind(null, client));
    });
	
});
                    /////////////////////////////////

client.on('guildCreate', guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});
                    /////////////////////////////////

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});
                    /////////////////////////////////

fs.readdir('./player/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./player/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading player event ${eventName}`);
        client.player.on(eventName, event.bind(null, client));
    });
});
                    /////////////////////////////////

fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
});
                    /////////////////////////////////

fs.readdir('./commands/info/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/info/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
});
                    /////////////////////////////////

fs.readdir('./commands/moderation/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/moderation/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
}); 
                    /////////////////////////////////

fs.readdir('./commands/music/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/music/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
});
                    /////////////////////////////////

fs.readdir('./commands/other/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/other/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
});
                    /////////////////////////////////

fs.readdir('./commands/support/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/support/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
});
                    /////////////////////////////////

fs.readdir('./commands/test/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/test/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
});

                    /////////////////////////////////

client.on('message', async message => {
if(message.content.match(new RegExp(`${client.user.id}`))) 
return msg.inlineReply("My Prefix is ~, to get started; type '~help'")
})
client.login(client.config.token_bot);
