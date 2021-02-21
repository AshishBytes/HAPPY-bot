exports.run = (client, message, args) => {
    const setChannelID = message.content.split(' ');

    try{
        message.guild.channels.cache.get(setChannelID[1]).createInvite().then(invite =>
            message.inlineReply("The channel invite has been created: \n" + invite.url)
        );
    }

    catch(error){
        console.error(`I could not create the invite for the channel: ${error}`);
        message.inlineReply(`You have to paste a correct channel ID!`);
    }
}
