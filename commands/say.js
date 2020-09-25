module.exports = {
    name: 'say',
	description: 'Let the bot say things. (Admin only)',
	guildOnly: true,
    adminOnly: true,
    args: true,
    execute(message, args) {

        return message.delete(), message.channel.send(args.join(" "));

	},
};