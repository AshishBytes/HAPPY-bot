const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
  let notice3 = new Discord.MessageEmbed()
    .setDescription(
      `<a:cross1:815954673169072138> **I don't have permission to kick people!**`
    )
    .setColor("RED");
  if (!msg.guild.member(client.user).hasPermission("KICK_MEMBERS"))
    return msg.channel.send(notice3).then((m) => m.delete({ timeout: 5000 }));
  let kickTaged = msg.mentions.users.first();
  let reason = args.slice(1).join(" ");
  let embed6 = new Discord.MessageEmbed()
    .setDescription(
      `<a:cross1:815954673169072138> ${msg.author.username}, Missing Permission`
    )
    .setColor("RED");
  if (!msg.member.hasPermission("KICK_MEMBERS"))
    return msg.channel.send(embed6).then((m) => m.delete({ timeout: 5000 }));
  let mmqembed = new Discord.MessageEmbed()
    .setTitle("Command: ~kick")
    .setDescription("Usage: ~kick @user reason")
    .setColor("RED");
  if (!kickTaged) {
    msg.delete();
    return msg.channel.send(mmqembed).then((m) => m.delete({ timeout: 5000 }));
  }

  let dsfdsfsdf = new Discord.MessageEmbed()
    .setDescription(
      `<a:cross1:815954673169072138> Access Denied, **that member has roles higher or equal to you!**`
    )
    .setColor("RED");
  let sdfsdfsdfsd = new Discord.MessageEmbed()
    .setDescription(
      `<a:cross1:815954673169072138> Access Denied, **that member has roles higher or equal to me!**`
    )
    .setColor("RED");
  let botRolePossition = msg.guild.member(client.user).roles.highest.position;
  let rolePosition = msg.guild.member(kickTaged).roles.highest.position;
  let userRolePossition = msg.member.roles.highest.position;
  if (userRolePossition <= rolePosition) return msg.channel.send(dsfdsfsdf);
  if (botRolePossition <= rolePosition) return msg.channel.send(sdfsdfsdfsd);

  let notice2 = new Discord.MessageEmbed()
    .setDescription(
      `<a:cross1:815954673169072138> **You cannot kick yourself!**`
    )
    .setColor("RED");
  if (msg.mentions.users.first().id === msg.author.id)
    return msg.channel.send(notice2);

  let sdfdfsdfsdfdfs = new Discord.MessageEmbed()
    .setDescription(
      `<a:cross1:815954673169072138> **An error occurred with banned that member!**`
    )
    .setColor("RED");

  if (!msg.guild.member(kickTaged).kickable) {
    return msg.channel.send(sdfdfsdfsdfdfs);
  }

  if (reason.length < 1) reason = "No reason given.";

  let kickEmbed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle(`Action Kick`)
    .addField("Target", `**<@${kickTaged.id}> **`)
    .addField("User", `<@${msg.author.id}>`)
    .addField("Reason", `\`\`\`${reason}\`\`\``)
    .setTimestamp();

  let suembed = new Discord.MessageEmbed()
    .setDescription(
      `<a:cross1:815954673169072138> **Kicked ${kickTaged.username}#${kickTaged.discriminator}** | **${reason}**`
    )
    .setColor("AQUA");
  msg.delete();
  msg.channel.send(suembed);
  msg.guild.member(kickTaged).kick(reason);

  kickTaged.send(`You had been kicked in **${msg.guild.name}**, ${reason}`);
};

module.exports.help = {
  name: "kick",
  description:
    "This command is used for kicking people u hates or againsting your server rules.",
  usage: "d!kick <mentions> <reason>",
  accessableby: "Kick Members",
  aliases: [],
};
