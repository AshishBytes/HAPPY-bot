/////////////////
//configuration//
/////////////////
const Discord = require("discord.js");
const db = require('quick.db');
const { getLyrics } = require('genius-lyrics-api');
const DisTube = require("distube");
const radio = require("./radio");
const config = {
    PREFIX: "~",
    token: "ODEwODI1MTc0OTkwNDU0Nzk0.YCpRyg.s2PNyPj-SR5hIc3BQztC3HNf4WI",
    geniusapi: ''
}
const client = new Discord.Client({ disableMentions: "all" });
const distube = new DisTube(client, {
    youtubeCookie: "",
    searchSongs: false,
    emitNewSongOnly: true, 
    highWaterMark: 1 << 25, 
    leaveOnEmpty: true, 
    leaveOnFinish: true, 
    leaveOnStop: true,
    customFilters:
    {
        "clear": "dynaudnorm=f=200",
        "bassboost": "bass=g=20,dynaudnorm=f=200",
        "8d": "apulsator=hz=0.08",
        "vaporwave": "aresample=48000,asetrate=48000*0.8",
        "nightcore": "aresample=48000,asetrate=48000*1.25",
        "phaser": "aphaser=in_gain=0.4",
        "purebass": "bass=g=20,dynaudnorm=f=200,asubboost",
        "tremolo": "tremolo",
        "vibrato": "vibrato=f=6.5",
        "reverse": "areverse",
        "treble": "treble=g=5",
        "surrounding": "surround",
        "pulsator": "apulsator=hz=1",
        "subboost": "asubboost",
        "karaoke": "stereotools=mlev=0.03",
        "flanger": "flanger",
        "gate": "agate",
        "haas": "haas",
        "mcompand": "mcompand"
    }
})
let stateswitch = false;
let emojis = [
    "✅", 
    "☑️",
    "👌", 
    "👍",
    "❤️",
    "🎶",
    "🎵"
];
const filters = [
    "mcompand",
    "gate",
    "haas",
    "pulsator",
    "surrounding",
    "clear",
    "8d",
    "bassboost",
    "echo",
    "karaoke",
    "nightcore",
    "vaporwave",
    "flanger",
    "subboost",
    "phaser",
    "tremolo",
    "vibrato",
    "reverse",
    "purebass",
    "treble"
];
/////////////////
//////Events/////
/////////////////
client.login(config.token); //start the bot
//log when ready and status
client.on("ready", () => {
    console.log(` :: Bot has started as :: ${client.user.tag}`);    
})

client.on("message", async message => {
    if (message.author.bot) return; //if a bot return 
    if (!message.guild) return;     //if not in a guild return
    
    let prefix = await db.get(`prefix_${message.guild.id}`)//getting prefix 
    if (prefix === null) prefix = config.PREFIX;           //if not prefix set it to standard prefix in the config.json file
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g); //arguments of the content
    const command = args.shift();                                          //defining the command msgs

    if (message.content.startsWith(prefix)) { //if its a command react with a random emoji
        message.react("👍");        //react with the emoji*/
    }
    else { //if not a command skip
        return; 
    }

///////////////////
/////COMMANDS//////
///////////////////
try{
    if (command === "radio") {
        return radio(client, message, args); //get the radio module
    }
  
    else if (command === "search" ) {

        embedbuilder(client, message, "AQUA", "Searching!", args.join(" "))

        let result = await distube.search(args.join(" "));

        let searchresult = "";

        for (let i = 0; i <= result.length; i++) {
            try {
                searchresult += await `**${i + 1}**. ${result[i].name} - \`${result[i].formattedDuration}\`\n`;
            } catch {
                searchresult += await " ";
            }
        }
        let searchembed = await embedbuilder(client, message, "AQUA", "Current Queue!", searchresult)

        let userinput;

        await searchembed.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 60000, errors: ["time"], }).then(collected => {
            userinput = collected.first().content;
            if (isNaN(userinput)) {
                embedbuilder(client, message, "AQUA", "Not a right number!", "so i use number 1!")
                userinput = 1;
            }
            if (Number(userinput) < 0 && Number(userinput) >= 15){
                embedbuilder(client, message, "AQUA", "Not a right number!", "so i use number 1!")
                userinput = 1;
            }
            searchembed.delete({ timeout: Number(client.ws.ping) });
        }).catch(() => { console.log(console.error); userinput = 404 });
        if (userinput === 404) {
            return embedbuilder(client, message, "AQUA", "Something went wrong!")
        }
        embedbuilder(client, message, "AQUA", "Searching!", `[${result[userinput - 1].name}](${result[userinput - 1].url})`, result[userinput - 1].thumbnail)
        return distube.play(message, result[userinput - 1].url)
    }
    else if (command == "status") {
        let queue = distube.getQueue(message);
        if (!queue) return embedbuilder(client, message, "AQUA", "There is nothing playing!").then(msg => msg.delete({timeout: 5000}).catch(console.error));
       
        const status = `Volume: \`${queue.volume}\` | Filter: \`${queue.filter || "❌"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
        return embedbuilder(client, message, "AQUA", "Current status:", status)
    }
    else if (command == "np" || command === "nowplaying") {
        let queue = distube.getQueue(message);
        if (!queue) return embedbuilder(client, message, "AQUA", "There is nothing playing!").then(msg => msg.delete({timeout: 5000}).catch(console.error));
       
        let cursong = queue.songs[0];

        return embedbuilder(client, message, "AQUA", "Current Song!", `[${cursong.name}](${cursong.url})\n\nPlaying for: \`${(Math.floor(queue.currentTime / 1000 / 60 * 100) / 100).toString().replace(".", ":")} Minutes\`\n\nDuration: \`${cursong.formattedDuration}\``, cursong.thumbnail)
    }
    else if (command == "pause") {
        embedbuilder(client, message, "AQUA", "Paused!")
        return distube.pause(message);
    }
    else if (command == "resume" || command == "r") {
        embedbuilder(client, message, "AQUA", "Resume!")
        return distube.resume(message);
    }
    else if (command == "shuffle" || command == "mix") {
        embedbuilder(client, message, "AQUA", "Shuffled!")
        return distube.shuffle(message);
    }
    else if (command == "lyrics" || command == "ly")
    {
       
        let queue = distube.getQueue(message);
        
        if (!queue) return embedbuilder(client, message, "AQUA", "There is nothing playing!").then(msg => msg.delete({timeout: 5000}).catch(console.error));
       
        let cursong = queue.songs[0];
        embedbuilder(client, message, "AQUA", "Searching!").then(msg => msg.delete({timeout: 5000}).catch(console.error));

        const options = {
            apiKey: config.geniusapi,
            title: cursong.name,
            artist: cursong.info.videoDetails.author.name,
            optimizeQuery: true
        };
   
        getLyrics(options).then(async (lyrics) => {
           
            if(!lyrics || lyrics === null || lyrics === "null") return message.reply("no lyrics found!")

            let currentPage = 0;
            const embeds = lyricsEmbed(message,lyrics,cursong);
        
            const queueEmbed = await message.channel.send(
              `**Current Page - ${currentPage + 1}/${embeds.length}**`,
              embeds[currentPage]
            );
        
            try {
              await queueEmbed.react("⬅️");
              await queueEmbed.react("⏹");
              await queueEmbed.react("➡️");
            } catch (error) {
              console.error(error);
              message.channel.send(error.message).catch(console.error);
            }
        
            const filter = (reaction, user) =>
              ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
            const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });
        
            collector.on("collect", async (reaction, user) => {
              try {
                if (reaction.emoji.name === "➡️") {
                  if (currentPage < embeds.length - 1) {
                    currentPage++;
                    queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                  }
                } else if (reaction.emoji.name === "⬅️") {
                  if (currentPage !== 0) {
                    --currentPage;
                    queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                  }
                } else {
                  collector.stop();
                  reaction.message.reactions.removeAll();
                }
                await reaction.users.remove(message.author.id);
              } catch (error) {
                console.error(error);
                return message.channel.send(error.message).catch(console.error);
              }
            }); 
         
        });
    }
    else if (command == "playskip" || command == "ps") {
        embedbuilder(client, message, "AQUA", "Searching and Skipping!", args.join(" "))
        try {
            await message.guild.channels.cache.get(db.get(`playingchannel_${message.guild.id}`)).messages.cache.get(db.get(`playingembed_${message.guild.id}`), false, true).delete().catch(console.error);
        } catch (error) {
            console.error(error)
            
        }
        return distube.playSkip(message, args.join(" "));
    }
    else if (command == "autoplay" || command == "ap") {
        await embedbuilder(client, message, "AQUA", `Autoplay is now on ${distube.toggleAutoplay(message) ? "ON" : "OFF"}!`)
        await message.guild.channels.cache.get(db.get(`playingchannel_${message.guild.id}`)).messages.cache.get(db.get(`playingembed_${message.guild.id}`), false, true).edit(curembed(message))
        await delay(5000);
        
        await message.channel.bulkDelete(2)
        return
        return;
    }
    else if (command === "play" || command === "p") {
        embedbuilder(client, message, "AQUA", "Searching!", args.join(" ")).then(msg => msg.delete({ timeout: 5000 }).catch(console.error))
        return distube.play(message, args.join(" "));
    }
    else if (command === "skip" || command === "s") {
        embedbuilder(client, message, "AQUA", "SKIPPED!", `Skipped the song`).then(msg => msg.delete({ timeout: 5000 }).catch(console.error))
        try {
            await message.guild.channels.cache.get(db.get(`playingchannel_${message.guild.id}`)).messages.cache.get(db.get(`playingembed_${message.guild.id}`), false, true).delete().catch(console.error);
        } catch (error) {
            console.error(error)
        }
        return distube.skip(message);
    }
    else if (command === "stop" || command === "leave") {
        embedbuilder(client, message, "AQUA", "STOPPED!", `Left the channel`).then(msg => msg.delete({ timeout: 5000 }).catch(console.error))
        try {
            await message.guild.channels.cache.get(db.get(`playingchannel_${message.guild.id}`)).messages.cache.get(db.get(`playingembed_${message.guild.id}`), false, true).delete().catch(console.error);
        } catch (error) {
            console.error(error)
            
        }
        return distube.stop(message);
    }
    else if (command === "seek") {
        await embedbuilder(client, message, "AQUA", "Seeked!", `seeked the song to \`${args[0]} seconds\``)
        await distube.seek(message, Number(args[0] * 1000));
        await message.guild.channels.cache.get(db.get(`playingchannel_${message.guild.id}`)).messages.cache.get(db.get(`playingembed_${message.guild.id}`), false, true).edit(curembed(message))
        await delay(5000);
        await message.channel.bulkDelete(2)
        return
    }
    else if (filters.includes(command)) {
        let filter = await distube.setFilter(message, command);
        await message.guild.channels.cache.get(db.get(`playingchannel_${message.guild.id}`)).messages.cache.get(db.get(`playingembed_${message.guild.id}`), false, true).edit(curembed(message))
        await embedbuilder(client, message, "AQUA", "Adding filter!", filter)
        await delay(5000);
        await message.channel.bulkDelete(2)
        return
    }
    else if (command === "volume" || command === "vol") {

        embedbuilder(client, message, "AQUA", "VOLUME!", `changed volume to \`${args[0]} %\``)
        await distube.setVolume(message, args[0]);
        await message.guild.channels.cache.get(db.get(`playingchannel_${message.guild.id}`)).messages.cache.get(db.get(`playingembed_${message.guild.id}`), false, true).edit(curembed(message))
        await delay(5000);
        await message.channel.bulkDelete(2)
        return
    }
    else if (command === "queue" || command === "qu") {

        let currentPage = 0;
        let queue = distube.getQueue(message);
        if (!queue) return embedbuilder(client, message, "AQUA", "There is nothing playing!").then(msg => msg.delete({timeout: 5000}).catch(console.error));
       
        const embeds = QueueEmbed(queue.songs);
        const queueEmbed = await message.channel.send(`
        **Current Page - ${currentPage + 1}/${embeds.length}**`,
            embeds[currentPage]);
        try {
            await queueEmbed.react("⬅️");
            await queueEmbed.react("⏹");
            await queueEmbed.react("➡️");
        } catch (error) {
            console.error(error)
            
        }
        const filter = (reaction, user) =>
            ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
        const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });
        collector.on("collect", async (reaction, user) => {
            try {
                if (reaction.emoji.name === "➡️") {
                    if (currentPage < embeds.length - 1) {
                        currentPage++;
                        queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                    }
                } else if (reaction.emoji.name === "⬅️") {
                    if (currentPage !== 0) {
                        --currentPage;
                        queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
                    }
                } else {
                    collector.stop();
                    reaction.message.reactions.removeAll();
                }
                await reaction.users.remove(message.author.id);
            } catch (error) {
                console.error(error)
                
            }
        })
    }
    else if (command === "loop" || command === "repeat") {
        if (0 <= Number(args[0]) && Number(args[0]) <= 2) {
            await distube.setRepeatMode(message, parseInt(args[0]));
            await message.guild.channels.cache.get(db.get(`playingchannel_${message.guild.id}`)).messages.cache.get(db.get(`playingembed_${message.guild.id}`), false, true).edit(curembed(message))
            await embedbuilder(client, message, "AQUA", "Repeat mode set to:!", `${args[0].replace("0", "OFF").replace("1", "Repeat song").replace("2", "Repeat Queue")}`)
            await delay(5000);
            await message.channel.bulkDelete(2)
            return
        }
        else {
            return embedbuilder(client, message, "AQUA", "ERROR", `Please use a number between **0** and **2**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`)
        }
    }
    else if (command === "jump") {
        let queue = distube.getQueue(message);
        if (!queue) return embedbuilder(client, message, "AQUA", "There is nothing playing!").then(msg => msg.delete({timeout: 5000}).catch(console.error));
       
        if (0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length) {
            embedbuilder(client, message, "AQUA", "ERROR", `Jumped ${parseInt(args[0])} songs!`)
            try {
                await message.guild.channels.cache.get(db.get(`playingchannel_${message.guild.id}`)).messages.cache.get(db.get(`playingembed_${message.guild.id}`), false, true).delete().catch(console.error);
            } catch (error) {
                console.error(error)
                
            }
            return distube.jump(message, parseInt(args[0]))
                .catch(err => message.channel.send("Invalid song number."));
        }
        else {
            return embedbuilder(client, message, "AQUA", "ERROR", `Please use a number between **0** and **${DisTube.getQueue(message).length}**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`)
        }

    }
}catch (error){
    console.error
 }
})
///////////////
////DISTUBE////
///////////////
distube
    .on("playSong", async (message, queue, song) => {
        try{ playsongyes(message, queue, song);
        }catch (error){
            console.error
         }
    })
    .on("addSong", (message, queue, song) => {
        try{    return embedbuilder(client, message, "AQUA", "Added a Song!", `Song: [\`${song.name}\`](${song.url})  -  \`${song.formattedDuration}\` \n\nRequested by: ${song.user}\n\nEstimated Time: ${queue.songs.length - 1} song(s) - \`${(Math.floor((queue.duration - song.duration) / 60 * 100) / 100).toString().replace(".", ":")}\`\nQueue duration: \`${queue.formattedDuration}\``, song.thumbnail)
    }catch (error){
        console.error
     }
    })
    .on("playList", (message, queue, playlist, song) => {
        try{   playplaylistyes(message, queue, playlist, song);
    }catch (error){
        console.error
     }
    })
    .on("addList", (message, queue, playlist, song) => {
        try{    return embedbuilder(client, message, "AQUA", "Added a Playling!", `Playlist: [\`${playlist.name}\`](${playlist.url})  -  \`${playlist.songs.length} songs\` \n\nRequested by: ${song.user}`, playlist.thumbnail)
    }catch (error){
        console.error
     }
    })
    .on("searchResult", (message, result) => {
        try{    let i = 0;
        return embedbuilder(client, message, "AQUA", "", `**Choose an option from below**\n${result.map(song => `**${++i}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    }catch (error){
        console.error
     }
    })
    .on("searchCancel", (message) => {
        try {
            message.reactions.removeAll();
            message.react("❌")
        } catch (error) {
            console.error(error)
            
        }
        try{   return embedbuilder(client, message, "AQUA", `Searching canceled`, "").then(msg => msg.delete({ timeout: 5000 }).catch(console.error))
    }catch (error){
        console.error
     }
    })
    .on("error", (message, err) => {
        try {
            message.reactions.removeAll();
            message.react("❌")
        } catch (error) {
            console.error(error)    
        }
       console.log(err);
        try{   return embedbuilder(client, message, "AQUA", "An error encounteAQUA:", "```"+err+"```")
    }catch (error){
        console.error
     }
    })
    .on("finish", message => {
        try{ return embedbuilder(client, message, "AQUA", "LEFT THE CHANNEL", "There are no more songs left").then(msg => msg.delete({ timeout: 5000 }).catch(console.error))
    }catch (error){
        console.error
     }
    })
    .on("empty", message => {

        try{   return embedbuilder(client, message, "AQUA", "Left the channel cause it got empty!").then(msg => msg.delete({ timeout: 5000 }).catch(console.error))
    }catch (error){
        console.error
     }
    })
    .on("noRelated", message => {
        try{    return embedbuilder(client, message, "AQUA", "Can't find related video to play. Stop playing music.").then(msg => msg.delete({ timeout: 5000 }).catch(console.error))
    }catch (error){
        console.error
     }
    })
    .on("initQueue", queue => {
        try{   queue.autoplay = false;
        queue.volume = 100;
        queue.filter = filters[5];
    }catch (error){
        console.error
     }
    });
///////////////
///FUNCTIONS///
///////////////
//function embeds creates embeds
function embedbuilder(client, message, color, title, description, thumbnail) {
    try{   let embed = new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(message.author.tag, message.member.user.displayAvatarURL({ dynamic: true }),"https://top.gg/bot/810825174990454794")
        .setFooter(client.user.username, client.user.displayAvatarURL());
    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (thumbnail) embed.setThumbnail(thumbnail)
    return message.channel.send(embed);
}catch (error){
    console.error
 }
}

//this function is for playing the song
async function playsongyes(message, queue, song) {
    try{  let embed1 = new Discord.MessageEmbed()

        .setColor("AQUA")
        .setTitle("Playing Song!")
        .setDescription(`Song: [\`${song.name}\`](${song.url})`)
        .addField("⏱ Duration:", ` \`${queue.formattedCurrentTime} / ${song.formattedDuration}\``, true)
        .addField("🌀 Queue:", `\`${queue.songs.length} song(s) - ${queue.formattedDuration}\``, true)
        .addField("🔊 Volume:", `\`${queue.volume} %\``, true)
        .addField("♾ Loop:", `  \`${queue.repeatMode ? queue.repeatMode === 2 ? "✅ Queue" : "✅ Song" : "❌"}\``, true)
        .addField("↪️ Autoplay:", `\`${queue.autoplay ? "✅" : "❌"}\``, true)
        .addField("❔ Filter:", `\`${queue.filter || "❌"}\``, true)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setAuthor(message.author.tag, message.member.user.displayAvatarURL({ dynamic: true }),"https://top.gg/bot/810825174990454794")
        .setThumbnail(song.thumbnail)

    var playingMessage = await message.channel.send(embed1)

    db.set(`playingembed_${message.guild.id}`, playingMessage.id)
    db.set(`playingchannel_${message.guild.id}`, message.channel.id)
    try {
        await playingMessage.react("⏭");
        await playingMessage.react("⏹");
        await playingMessage.react("🔉");
        await playingMessage.react("🔊");
        await playingMessage.react("◀️");
        await playingMessage.react("▶️");
    }
    catch (error) {
        message.reply("Missing permissions, i need to add reactions!")
        console.log(error);
    }

    const filter = (reaction, user) =>
        ["⏭", "⏹", "🔉", "🔊", "◀️", "▶️"].includes(reaction.emoji.name) && user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
        time: song.duration > 0 ? song.duration * 1000 : 600000
    });
    collector.on("collect", async (reaction, user) => {
        if (!queue) return;
        const member = message.guild.member(user);
        if (member.voice.connection && member.voice.connection !== member.guild.me.voice.connection) return;

        switch (reaction.emoji.name) {
            case "⏭":
                distube.skip(message);
                embedbuilder(client, message, "AQUA", "SKIPPED!", `Skipped the song`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                playingMessage.reactions.removeAll().catch(console.error);
                playingMessage.delete({ timeout: client.ws.ping }).catch(console.error);
                break;

            case "⏹":
                distube.stop(message);
                playingMessage.reactions.removeAll().catch(console.error);
                playingMessage.delete({ timeout: client.ws.ping }).catch(console.error);
                embedbuilder(client, message, "AQUA", "STOPPED!", `Left the channel`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                break;

            case "🔉":

                reaction.users.remove(user).catch(console.error);
                await distube.setVolume(message, Number(queue.volume) - 10);
                embedbuilder(client, message, "AQUA", "Volume!", `AQUAused the Volume to \`${queue.volume}\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                await playingMessage.edit(curembed(message)).catch(console.error);
                break;

            case "🔊":

                reaction.users.remove(user).catch(console.error);
                await distube.setVolume(message, Number(queue.volume) + 10);
                embedbuilder(client, message, "AQUA", "Volume!", `Raised the Volume to \`${queue.volume}\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                await playingMessage.edit(curembed(message)).catch(console.error);
                break;

            case "◀️":

                reaction.users.remove(user).catch(console.error);
                let seektime = queue.currentTime - 10000;
                if (seektime < 0) seektime = 0;
                await distube.seek(message, Number(seektime));
                playingMessage.edit(curembed(message)).catch(console.error);
                embedbuilder(client, message, "AQUA", "Seeked!", `Seeked the song for \`-10 seconds\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))

                break;

            case "▶️":
                reaction.users.remove(user).catch(console.error);
                let seektime2 = queue.currentTime + 10000;
                if (seektime2 >= queue.songs[0].duration * 1000) { seektime2 = queue.songs[0].duration * 1000 - 1; }
                console.log(seektime2)
                await distube.seek(message, seektime2);
                playingMessage.edit(curembed(message)).catch(console.error);
                embedbuilder(client, message, "AQUA", "Seeked!", `Seeked the song for \`+10 seconds\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                break;

            default:
                reaction.users.remove(user).catch(console.error);
                break;
        }
    });
    collector.on("end", () => {
        playingMessage.reactions.removeAll().catch(console.error);
        playingMessage.delete({ timeout: client.ws.ping }).catch(console.error);
    })
}catch (error){
    console.error
 }
}

//this function is for playlistsong playing like the function above
async function playplaylistyes(message, queue, playlist, song) {
    try {
        var playingMessage = await embedbuilder(client, message, "AQUA", "Playling playlist", `Playlist: [\`${playlist.name}\`](${playlist.url})  -  \`${playlist.songs.length} songs\` \n\nRequested by: ${song.user}\n\nVolume: \`${queue.volume} %\`\nLoop: \`${queue.repeatMode ? "On" : "Off"}\`\nAutoplay: \`${queue.autoplay ? "On" : "Off"}\`\nFilter: \`${queue.filter || "❌"}\``, playlist.thumbnail)
        await playingMessage.react("⏭");
        await playingMessage.react("⏹");
        await playingMessage.react("🔉");
        await playingMessage.react("🔊");
        await playingMessage.react("◀️");
        await playingMessage.react("▶️");
    }
    catch {
        console.error(error);
    }
    try{ 
    const filter = (reaction, user) =>
        ["⏭", "⏹", "🔉", "🔊", "◀️", "▶️"].includes(reaction.emoji.name) && user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
        time: song.duration > 0 ? song.duration * 1000 : 600000
    });
    collector.on("collect", (reaction, user) => {
        if (!queue) return;
        const member = message.guild.member(user);
        if (member.voice.connection && member.voice.connection !== member.guild.me.voice.connection) return;

        switch (reaction.emoji.name) {

            case "⏭":
                reaction.users.remove(user).catch(console.error);
                embedbuilder(client, message, "AQUA", "SKIPPED!", `Skipped the song`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                distube.skip(message);
                break;

            case "⏹":
                reaction.users.remove(user).catch(console.error);
                embedbuilder(client, message, "AQUA", "STOPPED!", `Left the channel`).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                distube.stop(message);
                break;

            case "🔉":
                reaction.users.remove(user).catch(console.error);
                distube.setVolume(message, Number(queue.volume) - 10);
                embedbuilder(client, message, "AQUA", "Volume!", `AQUAused the Volume to \`${queue.volume}\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                break;

            case "🔊":
                reaction.users.remove(user).catch(console.error);
                distube.setVolume(message, Number(queue.volume) + 10);
                embedbuilder(client, message, "AQUA", "Volume!", `Raised the Volume to \`${queue.volume}\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                break;

            case "◀️":
                reaction.users.remove(user).catch(console.error);
                embedbuilder(client, message, "AQUA", "Seeked!", `Seeked the song for \`-10 seconds\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                let seektime = queue.currentTime - 10000;
                if (seektime < 0) seektime = 0;
                distube.seek(message, Number(seektime));
                break;

            case "▶️":
                reaction.users.remove(user).catch(console.error);
                embedbuilder(client, message, "AQUA", "Seeked!", `Seeked the song for \`+10 seconds\``).then(msg => msg.delete({ timeout: 3000 }).catch(console.error))
                let seektime2 = queue.currentTime + 10000;
                console.log(seektime2);
                if (seektime2 > queue.songs[0].duration) seektime2 = queue.songs[0].duration - 1;
                distube.seek(message, Number(seektime2));
                break;

            default:
                reaction.users.remove(user).catch(console.error);
                break;
        }
    });
    collector.on("end", () => {
        playingMessage.reactions.removeAll().catch(console.error);
        playingMessage.delete({ timeout: client.ws.ping }).catch(console.error);
    })
}catch (error){
    console.error
 }
}

//this function is for embed editing for the music info msg
function curembed(message) {
    try{  let queue = distube.getQueue(message); //get the current queue
    let song = queue.songs[0]; 
    embed = new Discord.MessageEmbed()
        .setColor("AQUA")
        .setTitle("Playing Song!")
        .setDescription(`Song: [\`${song.name}\`](${song.url})`)
        .addField("⏱ Duration:", `\`${queue.formattedCurrentTime} / ${song.formattedDuration}\``, true)
        .addField("🌀 Queue:", `\`${queue.songs.length} song(s) - ${queue.formattedDuration}\``, true)
        .addField("🔊 Volume:", `\`${queue.volume} %\``, true)
        .addField("♾ Loop:", `\`${queue.repeatMode ? queue.repeatMode === 2 ? "✅ Queue" : "✅ Song" : "❌"}\``, true)
        .addField("↪️ Autoplay:", `\`${queue.autoplay ? "✅" : "❌"}\``, true)
        .addField("❔ Filter:", `\`${queue.filter || "❌"}\``, true)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setAuthor(message.author.tag, message.member.user.displayAvatarURL({ dynamic: true }),"https://top.gg/bot/810825174990454794")
        .setThumbnail(song.thumbnail)
    return embed; //sending the new embed back
}catch (error){
    console.error
 }
}

//this function is for current Queue
function QueueEmbed(queue) {
    try{   let embeds = [];
    let k = 10;
    //defining each Pages
    for (let i = 0; i < queue.length; i += 10) {
        const current = queue.slice(i, k)
        let j = i;
        k += 10;
        const info = current.map((track) => `**${++j} -** [\`${track.name}\`](${track.url})`).join("\n")
        const embed = new Discord.MessageEmbed()
            .setTitle("Server Queue")
            .setColor("AQUA")
            .setDescription(`**Current Song - [\`${queue[0].name}\`](${queue[0].url})**\n\n${info}`)
            .setFooter(client.user.username, client.user.displayAvatarURL())
        embeds.push(embed);
    }
    //returning the Embed
    return embeds;
}catch (error){
    console.error
 }

}

//this function is for lyrics embed
function lyricsEmbed(message, lyrics, song) {
    try{   let embeds = [];
    let k = 1000;
  
    for (let i = 0; i < lyrics.length; i += 1000) {
      const current = lyrics.slice(i, k);
      let j = i;
      k += 1000;
      const embed = new Discord.MessageEmbed()
        .setTitle("Lyrics - "+ song.name)
        .setURL(song.url)
        .setThumbnail(song.thumbnail)
        .setColor("AQUA")
        .setDescription(current)
      embeds.push(embed);
    }
    return embeds;
}catch (error){
    console.error
 }
}  

/////////////
///GENERAL///
/////////////
//this function is for delaying stuff if needed
function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

//this function is for getting a random number
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}   
