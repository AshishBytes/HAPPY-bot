module.exports = async (client) => {

    console.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users`);
    new Client({ presence: { status: "idle" } });
    client.user.setActivity("~help", { type: "LISTENING" });
};
