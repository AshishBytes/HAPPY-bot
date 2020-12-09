const db = require('quick.db');

exports.run = async (client, message, args) => {

    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - You're not in a voice channel !`);

    if (!args[0]) return message.channel.send(`${client.emotes.error} - Please enter a radio name !`);

    const searchradio = Object.values(client.radios).find((r) => r.toLowerCase() === args[0].toLowerCase());
    if (!searchradio) return message.channel.send(`${client.emotes.error} - Please indicate the name of a correct radio.`);

    const stream = client.stream.arbitraryStream(Object.keys(client.radios).find((n) => client.radios[n] === searchradio), { opusEncoded: true, encoderArgs: [] });

    message.member.voice.channel.join().then(async connection => {
        const msg = await message.channel.send(`${client.emotes.success} - Launch in progress of **${searchradio}** in : ${message.member.voice.channel.name}.`);

        const dispatcher = connection.play(stream, { type: "opus" });
        dispatcher.setVolumeLogarithmic(50 / 200);

        dispatcher.on('start', () => {
            db.set(`voiceStream_${message.guild.id}`, Object.keys(client.radios).find((n) => client.radios[n] === searchradio));
            db.set(`voiceChannel_${message.guild.id}`, message.member.voice.channel.id);

            return msg.edit(`${client.emotes.success} - Radio in progress : **${searchradio}** in : ${message.member.voice.channel.name}.`).catch(() => { });
        });
    });

};
