const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let helpArray = message.content.split(" ");
	let helpArgs = helpArray.slice(1);

	if (!helpArgs[0]) {
		const embed = new Discord.MessageEmbed()
			.setTitle("DraconianBot Help & Commands list")
			.setColor("GREEN")
			.setDescription(
				"**prefix** `~`\nMore Info please visit: [Here](https://top.gg/bot/810825174990454794) and invite me to your server."
			)
			.addField("**📱Basic**", "`help`, `ping`, `vote`, `uptime`, `stats`")
			.addField(
				"**⚙utility**",
				"`aes256`,`deaes256`, `embed`, `enlarge`, `timer`, `translate`, `weather`"
			)
			.addField(
				"**🎃Fun**",
				"`8ball`, `meme`, `poke`, `reverse`, `smug`, `tickle`"
			)
			.addField(
				"**:tada:Giveaways**",
				"`gstart`, `greroll`, `gend`"
			)
			.addField(
				"**:frame_photo:Image**",
				"`cat`, `changemymind`, `circle`, `clyde`, `delete`, `kiss`, `pat`, `rainbow`, `rip`, `spank`, `triggered`"
			)
			.addField(
				"**:musical_note:Music**",
				"`play`,`join`,`pause`, `resume`, `queue`, `clear-queue/cq`, `shuffle`, `np`, `loop`, `volume`, `skip`, `stop/left/leave`, `filter`, `filters`, `enable-filters`"
			)
		        .addField(
				"**Music Filters**",
				"`bassboost`, `8D`, `vaporwave`, `nightcore`, `phaser`, `tremolo`, `vibrato`, `reverse`, `treble`, `normalizer`, `surrounding`, `pulsator`, `subboost`, `karaoke`, `flanger`, `gate`, `haas`, `mcompand`"
		        )
			.addField(
				"**🛠️Moderation**",
				"`ban`, `createemoji`, `kick`, `lockchannel`, `slowmode`, `unban`, `unlockchannel`, `clear/purge`"
			)
			/*.addField(
				"**:underage:NSFW**",
				"`4knsfw`, `anal`, `ass`, `hentai`, `holo`, `pussy`, `porn`, `spank`, `urban`"
			)*/
			.addField("**:gear:Custom Function**", "`setprefix`")
			.setFooter(
				`HAPPY | This command requested by ${message.author.username}#${message.author.discriminator}`
			);
		message.channel.send({ embed });
	}

	if (helpArgs[0]) {
		let command = helpArgs[0];

		if (bot.commands.has(command)) {
			command = bot.commands.get(command);
			let alia = command.help.aliases;
			if (command.help.aliases < 1) alia = "No aliases";

			var embed = new Discord.MessageEmbed()
				.setTitle(`**Command: ${command.help.name}**`)
				.setDescription(
					`
            **Description:**\n\`\`\`${
							command.help.description ||
							"There is no Description for this command."
						}\`\`\`\n**Usage:**\n\`\`\`${
						command.help.usage || "No Usage"
					}\`\`\`\n**Permissions:**\n\`\`\`${
						command.help.accessableby || "Members"
					}\`\`\`\n**Aliases:**\n\`\`\`${alia}\`\`\``
				)
				.setColor("#4a4b4d")
				.setFooter(
					`HAPPY | This command requested by ${message.author.username}#${message.author.discriminator}`
				);

			message.channel.send(embed);
		} else {
			var embeds = new Discord.MessageEmbed()
				.setTitle(`**Command: ${helpArgs[0]}**`)
				.setDescription(
					`
            **Response:**
						\`\`\`Error: 404 Not Found\`\`\``
				)
				.setColor("#ff0000");

			return message.channel.send(embeds);
		}
	}
};

module.exports.help = {
	name: "help",
	description: "This command is used for displaying all commands.",
	usage: "d!help",
	accessableby: "Members",
	aliases: [],
};
