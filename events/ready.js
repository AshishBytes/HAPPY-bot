module.exports = async (client) => {

    console.log(`Ready on ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} servers, for a total of ${client.users.cache.size} users`);

    client.user.setActivity(client.config.game)

};
