module.exports = (client, message, track) => {

    message.channel.send(`${client.emotes.title} - Now playing ${track.link} into ${message.member.voice.channel} ...`);

};
