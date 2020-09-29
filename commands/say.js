module.exports = {
    name: 'say',
	description: 'Let the bot say things. (Admin only)',
	guildOnly: true,
    adminOnly: true,
    args: true,
    execute(message, args) {

        message.delete();
        message.channel.send(args.join(" "));
        message.client.channels.cache.get(`608408953428246592`).send(`<@!614556845335642146> My say command just got abused by ${message.author}.`);

    },
};