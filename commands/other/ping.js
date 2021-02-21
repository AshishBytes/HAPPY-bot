exports.run = async (client, message) => {

    message.inlineReply(`${client.emotes.success} - Pong! Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);

};
