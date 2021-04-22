const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");

module.exports.run = async (client, message) => {
  var milliseconds = parseInt((client.uptime % 1000) / 100),
    seconds = parseInt((client.uptime / 1000) % 60),
    minutes = parseInt((client.uptime / (1000 * 60)) % 60),
    hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
  var days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
  days = days < 10 ? "0" + days : days;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  // var totcmds = files.length;

  fetch(
    `https://api.hetrixtools.com/v1/f10ac71364c8b1aa149b4079fe8eafc9/uptime/report/483cfd9cb2dd306bf8c00917da1df827/`
  )
    .then((response) => response.json())
    .then((data) => {
      let numberas = data.Uptime_Stats.Total.Uptime.toLocaleString();

      const embed = new Discord.MessageEmbed()
        .setColor("AQUA")
        .setTimestamp()
        // .addField("Prefix", 'd!', true)
        // .addField("Total Commands", `${totcmds} commands`, true)
        .addField("Total Servers", `${client.guilds.cache.size}`, true)
        .addField("Uptime Percentage", `${numberas}%`)
        .addField("Ping", Math.round(client.ws.ping) + "ms", true)
        .addField(
          "Uptime",
          days +
            "d " +
            hours +
            "h " +
            minutes +
            "m " +
            seconds +
            "." +
            milliseconds +
            "s",
          true
        )
        .setFooter(
          "HAPPY",
          "https://cdn.discordapp.com/attachments/815833340547956757/815873371434778624/20201206_125307.png"
        );
      return message.channel.send({ embed });
    });
};
module.exports.help = {
  name: "stats",
  description: "This command is used for monitoring stats of bot.",
  usage: "d!stats",
  accessableby: "Member",
  aliases: [],
};
