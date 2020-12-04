exports.run = async (client, message) => {

    message.channel.send({
        embed: {
            color: 'AQUA',
            author: { name: 'COMMANDS' },
            footer: { text: 'HAPPY' },
            fields: [
                { name: 'Music', value: '`play`,`join`,`dc`,`pause`, `resume`, `queue`, `clear-queue/cq`, `shuffle`, `np`, `loop`, `volume`, `skip`, `stop/left/leave`, `filter`, `filters`, `enable-filters`' },
                { name: 'Filters', value: '`bassboost`, `8D`, `vaporwave`, `nightcore`, `phaser`, `tremolo`, `vibrato`, `reverse`, `treble`, `normalizer`, `surrounding`, `pulsator`, `subboost`, `karaoke`, `flanger`, `gate`, `haas`, `mcompand`' },
                { name: 'Modration', value: '`purge`,`clear`,`ban`,`kick`,' },
	        { name: 'Info', value: '`info`,`serverinfo`,`userinfo`,' },
		{ name: 'Support', value: '`support`,`server`,`vote`,`invite`,' },
		{ name: 'stats', value: '`stats`,' },
		{ name: 'Other', value: '`createinvite`,`ping`,' },
            ],
            timestamp: new Date(),
            description: `MUSIC & MODRATION`,
        },
    });

};
