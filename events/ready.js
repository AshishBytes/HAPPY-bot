module.exports = async (client) => {

    console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users`);
    client.on("ready", () => {
    client.user.setPresence({
        game: { 
            name: '~help',
            type: 'LISTENING'
        },
        status: 'idle'
    })
})
};
