module.exports = (client, message, query, tracks) => {

    message.channel.send({
        embed: {
            color: 'AQUA',
            author: { name: `Here are your search results for ${query}` },
            footer: { text: 'HAPPY' },
            timestamp: new Date(),
            description: `${client.emotes.music} - Now playing ${track.title} into ${message.member.voice.channel} ...}`,
        },
    });

};
