module.exports = {
	name: 'members',
	description: 'Shows amount of members.',
	cooldown: 30,
	guildOnly: true,
	execute(message) {
		message.channel.send(`This server has **${message.guild.memberCount}** members!`);
	},
};
