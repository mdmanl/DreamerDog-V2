const { logChannel, owner } = require('../config.json');

module.exports = {
    name: 'say',
	description: 'Let the bot say things. (Admin only)',
	guildOnly: true,
    adminOnly: true,
    args: true,
    execute(message, args) {

        message.delete();
        message.channel.send(args.join(" "));
        if (message.author.id == owner) return;
        message.client.channels.cache.get(logChannel).send(`<@!614556845335642146> My say command just got abused by ${message.author}.`);

    },
};