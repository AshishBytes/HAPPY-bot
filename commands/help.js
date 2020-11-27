exports.run = async (client, message) => {

    message.channel.send({
        embed: {
            color: 'AQUA',
            author: { name: 'COMMANDS' },
            footer: { text: 'HAPPY' },
            fields: [
                { name: 'Bot', value: '`ping`' },
                { name: 'Music', value: '`play`, `pause`, `resume`, `queue`, `clear-queue`, `shuffle`, `np`, `loop`, `volume`, `skip`, `[stop/left/leave]`, `filter`, `enable-filters`' },
                { name: 'Filters', value: '`bassboost`, `8D`, `vaporwave`, `nightcore`, `phaser`, `tremolo`, `vibrato`, `reverse`, `treble`, `normalizer`, `surrounding`, `pulsator`, `subboost`, `karaoke`, `flanger`, `gate`, `haas`, `mcompand`' },
            ],
            timestamp: new Date(),
            description: `To use filters,  ${client.config.prefix}filter (filter_name). Example : ${client.config.prefix}filter 8D.`,
        },
    });

};
