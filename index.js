const fs = require('fs');
const Enmap = require("enmap");
const db = require("quick.db");
const discord = require('discord.js');
const client = new discord.Client({ disableMentions: 'everyone' });
const { Player } = require('discord-player');
const { GiveawaysManager } = require("discord-giveaways");
const cooldowns = new discord.Collection();
require("./ExtendedMessage");
let nz_date_string = new Date().toLocaleString("en-US", {
  timeZone: "Asia/Kolkata",
});
const express = require("express");
const app = express();
require('./music.js');

client.mapss = new Map();
client.mapss.set("uptimedate", nz_date_string);
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
client.snipes = new discord.Collection();
                    /////////////////////////////////

client.on('message', async message => {
if(message.content.match(new RegExp(`${client.user.id}`))) 
return message.inlineReply(new discord.MessageEmbed().setColor("#00FFFF").setAuthor(`${message.author.username}, My Prefix is ~, to get started; type ~help`, message.author.displayAvatarURL({ dynamic: true }),"https://top.gg/bot/810825174990454794"));
})
                    /////////////////////////////////

if (!db.get("giveaways")) db.set("giveaways", []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
  // This function is called when the manager needs to get all the giveaway stored in the database.
  async getAllGiveaways() {
    // Get all the giveaway in the database
    return db.get("giveaways");
  }

  // This function is called when a giveaway needs to be saved in the database (when a giveaway is created or when a giveaway is edited).
  async saveGiveaway(messageID, giveawayData) {
    // Add the new one
    db.push("giveaways", giveawayData);
    // Don't forget to return something!
    return true;
  }

  async editGiveaway(messageID, giveawayData) {
    // Gets all the current giveaways
    const giveaways = db.get("giveaways");
    // Remove the old giveaway from the current giveaways ID
    const newGiveawaysArray = giveaways.filter(
      (giveaway) => giveaway.messageID !== messageID
    );
    // Push the new giveaway to the array
    newGiveawaysArray.push(giveawayData);
    // Save the updated array
    db.set("giveaways", newGiveawaysArray);
    // Don't forget to return something!
    return true;
  }

  // This function is called when a giveaway needs to be deleted from the database.
  async deleteGiveaway(messageID) {
    // Remove the giveaway from the array
    const newGiveawaysArray = db
      .get("giveaways")
      .filter((giveaway) => giveaway.messageID !== messageID);
    // Save the updated array
    db.set("giveaways", newGiveawaysArray);
    // Don't forget to return something!
    return true;
  }
};

// Create a new instance of your new class
const manager = new GiveawayManagerWithOwnDatabase(client, {
  storage: false, // Important - use false instead of a storage path
  updateCountdownEvery: 3000,
  endedGiveawaysLifetime: 30000,
  hasGuildMembersIntent: false,
  default: {
    botsCanWin: false,
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    embedColor: "#00FFFF",
    embedColorEnd: "#32fbaa",
    reaction: "🎉",
  },
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;
// We now have a client.giveawaysManager property to manage our giveaways!





                    /////////////////////////////////

client.on('guildCreate', guild => {
    //console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.channels.cache.get("828985803178901544").send(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});
                    /////////////////////////////////

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    //console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.channels.cache.get("828985803178901544").send(`I have been removed from: ${guild.name} (id: ${guild.id})`);
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
fs.readdir('./commands/giveaways/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/giveaways/${file}`);
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

fs.readdir('./commands/image/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/image/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
});
                    /////////////////////////////////

fs.readdir('./commands/fun/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/fun/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
});
                    /////////////////////////////////

fs.readdir('./commands/utility/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/utility/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName}`);
        client.commands.set(commandName, props);
    });
});
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

/*fs.readdir('./events/giveaways/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/giveaways/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading player event ${eventName}`);
        client.player.on(eventName, event.bind(null, client));
    });
});*/
	            /////////////////////////////////

client.login(client.config.token_bot);
