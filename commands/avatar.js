const Discord = require("discord.js");

module.exports = {
	name: 'avatar',
	cooldown: 10,
	description: 'Get the avatar URL of the tagged user, or your own avatar.',
	execute(message) {

		let member = message.mentions.members.first();
		if (!member) member = message.member;

		var eAvatar = new Discord.MessageEmbed()
			.setColor('#73e600')
			.setAuthor(`${member.user.username}'s avatar`, member.user.displayAvatarURL(), '')
			.setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024, format: 'png' }))
			.setTimestamp()
			.setFooter(`Requested by ${message.author.username}`);
	
		message.channel.send(eAvatar);

	},
};