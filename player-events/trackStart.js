module.exports = (client, message, track) => {

    message.channel.send(`${client.emotes.music} - Now playing __${track.title}__ into ${message.member.voice.channel} ...`);

};
