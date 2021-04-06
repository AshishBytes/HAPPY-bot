module.exports = (client, message) => {
    if (!message.guild) return 
    if (message.author.bot) return;

    let prefix = await db.get(`prefix_${message.guild.id}`)//getting prefix 
    if (prefix === null) prefix = config.prefix;           //if not prefix set it to standard prefix in the config.json file

   // if (message.content.indexOf(prefix) !== 0) return; 

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if (!cmd) return;

    cmd.run(client, message, args);

};
