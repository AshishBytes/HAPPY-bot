const Enmap = require("enmap");
const discord = require("discord.js");
const client = new discord.Client({ disableMentions: "everyone" });

/////////////////////////////////

const fs = require("fs");
const { resolve } = require("path");
const walk = require("walk");
const walker = walk.walk("./commands");

/////////////////////////////////

const express = require("express");
const app = express();
require("./ExtendedMessage");

/////////////////////////////////
client.config = require('./config/config.json');
client.emotes = require('./config/emojis.json');
client.config = config;
client.emotes = emotes;

/////////////////////////////////

client.mapss = new Map();
let nz_date_string = new Date().toLocaleString("en-US", {
  timeZone: "Asia/Kolkata"
});
client.mapss.set("uptimedate", nz_date_string);

/////////////////////////////////

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.snipes = new discord.Collection();
client.categories = new discord.Collection();
client.cooldowns = new discord.Collection();

/////////////////////////////////

client.on("message", async message => {
  if (message.content.match(new RegExp(`${client.user.id}`)))
    return message.inlineReply(
      new discord.MessageEmbed()
        .setColor("#00FFFF")
        .setAuthor(
          `${message.author.username}, My Prefix is ~, to get started; type ~help`,
          message.author.displayAvatarURL({ dynamic: true }),
          "https://top.gg/bot/810825174990454794"
        )
    );
});

/////////////////////////////////

client.on("guildCreate", guild => {
  try {
    const server = client.guilds.cache.get(`${client.config.System_server}`);
    const channel = server.channels.cache.get(`${client.config.Bot_join}`);
    const joinEmbed = new discord.MessageEmbed()
      .setDescription("HAPPY was added to a server")
      .setTitle("Joined")
      .setColor("AQUA")
      .setThumbnail(`${client.config.Bot_avatar}`)
      .setTimestamp()
      .setFooter("HAPPY", `${client.config.Bot_avatar}`)
      .addFields(
        { name: "Name", value: guild.name, inline: false },
        { name: "GuildId", value: guild.id, inline: false },
        { name: "Guild OwnerId", value: guild.ownerID, inline: false },
        { name: "Member Count", value: guild.memberCount, inline: false },
        { name: "Total Guilds", value: client.guilds.cache.size, inline: true }
      );
    channel.send(joinEmbed);
  } catch (error) {
    console.log("There was an error sending join embed to channel");
  }
});

/////////////////////////////////

client.on("guildDelete", guild => {
  try {
    const server = client.guilds.cache.get(`${client.config.System_server}`);
    const channel = server.channels.cache.get(`${client.config.Bot_leave}`);
    const leaveEmbed = new discord.MessageEmbed()
      .setDescription("HAPPY was removed from a server")
      .setTitle("Removed")
      .setColor("AQUA")
      .setThumbnail(`${client.config.Bot_avatar}`)
      .setTimestamp()
      .setFooter("HAPPY", `${client.config.Bot_avatar}`)
      .addFields(
        { name: "Name", value: guild.name, inline: false },
        { name: "GuildId", value: guild.id, inline: false },
        { name: "Guild OwnerId", value: guild.ownerID, inline: false },
        { name: "Member Count", value: guild.memberCount, inline: false },
        { name: "Total Guilds", value: client.guilds.cache.size, inline: true }
      );
    channel.send(leaveEmbed);
  } catch (error) {
    console.log("There was an error sending leave embed to channel.");
  }
});

/////////////////////////////////

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

/////////////////////////////////

walker.on("file", function(root, stats, next) {
  if (!stats.name.endsWith(".js")) return;
  const category = resolve(root)
    .split("\\")
    .slice(-1)[0];
  if (!client.categories.has(category)) {
    client.categories.set(category, []);
  }
  let props = require(`${resolve(root)}/${stats.name}`);
  let commandName = stats.name.split(".")[0];
  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(commandName, props);
  client.categories.set(category, [
    ...client.categories.get(category),
    commandName
  ]);
  next();
});

/////////////////////////////////

client.login(client.config.bot_token);