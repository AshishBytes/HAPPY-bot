exports.run = (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!message.member.hasPermission("BAN_MEMBERS")){
        message.inlineReply("You don't have the permissions to use this command!");
    }

    else{
        if(!member)
            return message.inlineReply("Please mention a valid member of this server");
        if(!member.bannable) 
            return message.inlineReply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";

        member.ban({reason: reason})
            .catch(error => message.channel.send(`Sorry ${message.author} I couldn't ban the user`));
        message.inlineReply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
    }
}
