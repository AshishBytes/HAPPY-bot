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
client.mapss = new Map();
client.mapss.set("uptimedate", nz_date_string);
const Player = new player(client, {
	leaveOnEnd: true,
	leaveOnStop: true,
	leaveOnEmpty: false,
	timeout: 1200000,
        volume: 150,
        quality: 'high',
});
client.zlayer = new Player(client);
client.config = require('./config/bot.json');
client.emotes = require('./config/emojis.json');
client.filters = require('./config/filters.json');
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.snipes = new Map();
                    /////////////////////////////////

client.on('message', async message => {
if(message.content.match(new RegExp(`${client.user.id}`))) 
return message.inlineReply("My Prefix is ~, to get started; type '~help'")
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
  updateCountdownEvery: 10000,
  endedGiveawaysLifetime: 30000,
  hasGuildMembersIntent: false,
  default: {
    botsCanWin: false,
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    embedColor: "#ff6969",
    embedColorEnd: "#505050",
    reaction: "🎉",
  },
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;
// We now have a client.giveawaysManager property to manage our giveaways!





                    /////////////////////////////////

client.on('guildCreate', guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.channels.cache.get("815696106121199627").send(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});
                    /////////////////////////////////

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.channels.cache.get("815696106121199627").send(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});





                    ///////////////////////////////////////////////////////////////////////////////////////////////////

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const zlayer = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.zlayer.on(file.split(".")[0], event.bind(null, client));
};
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
