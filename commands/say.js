const cfg = require('../config.json');

module.exports = {
    name: 'say',
	description: 'Let the bot say things. (Admin only)',
	guildOnly: true,
    adminOnly: true,
    args: true,
    execute(message, args) {

        // if (message.author.id == "651069203582943242") return message.channel.send("You are banned from using this command");

        message.delete();
        message.channel.send(args.join(" "));
        if (message.author.id == cfg.owner) return;
        message.client.channels.cache.get("764621885626384415").send(`<@!614556845335642146> My say command just got abused by ${message.author}.`);

    },
};