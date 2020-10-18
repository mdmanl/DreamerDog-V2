const { version } = require('../config.json');
const emoji = require("../emoji.json");
const Discord = require("discord.js");


module.exports = {
	name: 'info',
	cooldown: 30,
	description: 'Shows information about the bot and version.',
	execute(message) {

		const uptime = process.uptime();
		const days = Math.floor(uptime / 60 / 60 / 24), hours = Math.floor(uptime / 60 / 60 % 24), minutes = Math.floor(uptime / 60 % 60);
		const daysLabel = days !== 1 ? 'days' : 'day', hoursLabel = hours !== 1 ? 'hours' : 'hour', minutesLabel = minutes !== 1 ? 'minutes' : 'minute';
		const daysStr = `${days.toLocaleString()} ${daysLabel}`, hoursStr = `${hours.toLocaleString()} ${hoursLabel}`, minutesStr = `${minutes.toLocaleString()} ${minutesLabel}`;

		var infoEmbed = new Discord.MessageEmbed()
			.setColor('#73e600')
			.addField('Uptime:', `${days > 0 ? `${daysStr} ` : ''}${hours > 0 ? `${hoursStr} ` : ''}${minutesStr}`, true)
			.addField('Discord.js:', 'v12.3.1', false)
			.addField('Node.js:', 'v12.18.4', true)
			.addField('MySQL:', 'MariaDB 10.5.5', true)
			.addField('OS:', 'CentOS 7', true)
			.setAuthor(`DreamerDog ${version}`)
			.setFooter(`Developed and maintained by MDMA for HaiX Community`)

		message.channel.send(infoEmbed)
	},
};