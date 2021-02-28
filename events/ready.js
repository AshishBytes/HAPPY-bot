module.exports = async (client) => {

    console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users`);
    client.user.setPresence({
        status: "idle",  //You can show online, idle....
        game: {
            name: "~help",  //The message shown
            type: "LISTENING" //PLAYING: WATCHING: LISTENING: STREAMING:
        }
    });
 });
};
