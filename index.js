const fs = require('fs');
const discord = require('discord.js');

const client = new discord.Client({ disableMentions: 'everyone' });

const { Player } = require('discord-player');
const player = new Player(client, {
    leaveOnEnd: false,
    leaveOnStop: true,
    leaveOnEmpty: false,
    quality: 'high',
});
client.player = new Player(client);
client.config = require('./config/bot.json');
client.emotes = require('./config/emojis.json');
client.filters = require('./config/filters.json');
client.commands = new discord.Collection();

const moderation = fs.readdirSync('./commands/moderation').filter(file => file.endsWith('.js'));
const info = fs.readdirSync('./commands/info').filter(file => file.endsWith('.js'));
const music = fs.readdirSync('./commands/music').filter(file => file.endsWith('.js'));

for (const file of moderation) {
    console.log(`Loading command ${file}`);
    const command = require(`./commands/moderation/${file}`);
    client.commands.set(command.name.toLowerCase(), command);
};

for (const file of info) {
    console.log(`Loading command ${file}`);
    const command = require(`./commands/info/${file}`);
    client.commands.set(command.name.toLowerCase(), command);
};

for (const file of music) {
    console.log(`Loading command ${file}`);
    const command = require(`./commands/music/${file}`);
    client.commands.set(command.name.toLowerCase(), command);
};

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};

client.login(client.config.token_bot);
