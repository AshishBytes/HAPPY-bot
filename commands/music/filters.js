exports.run = async (client, message) => {

    message.channel.send({
        embed: {
            color: 'AQUA',
            author: { name: 'filters' },
            footer: { text: 'HAPPY' },
            fields: [
                { name: 'Filters', value: '`bassboost`, `8D`, `vaporwave`, `nightcore`, `phaser`, `tremolo`, `vibrato`, `reverse`, `treble`, `normalizer`, `surrounding`, `pulsator`, `subboost`, `karaoke`, `flanger`, `gate`, `haas`, `mcompand`' },
            ],
            timestamp: new Date(),
            description: `To use filters,  ${client.config.prefix}filter (filter_name). Example : ${client.config.prefix}filter 8D.`,
        },
    });

};
