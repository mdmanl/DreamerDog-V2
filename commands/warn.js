const nodeDate = require('date-and-time');
const mysql = require("mysql");
const database = require("../database.json");
const admins = require('../config.json');

module.exports = {
	name: 'warn',
	aliases: ['warning'],
	description: 'Warns a user. (Admin only)',
	usage: '[User] [Reason]',
	guildOnly: true,
	adminOnly: true,
	execute(message, args) {
		
		let now = nodeDate.format(new Date(), 'HH:mm [GMT+1] DD[th] of MMMM');

		let member = message.mentions.members.first();

		if(!member)
		  return message.delete(), message.channel.send(":information_source: Ehm, you didn't mention a valid member d0g.")

		  if(member.roles.cache.some(r=>admins.includes(r.name)) )
		  return message.delete(), message.channel.send(`You cannot warn another admin!`)
		 
		  let reason = args.slice(1).join(' ');
		  if(!reason) return message.delete(), message.channel.send(":information_source: Ehm, you forgot the reason d0g.")
		  
		  message.delete();
		  message.channel.send(`${member.user.tag} has been warned.`)
		  if(!member.roles.cache.some(r=>["577139538938429443"].includes(r.id)) )
		  return message.client.channels.cache.get(`585557517531348992`).send(`${member} Warned once by Admin: ${message.author.username} ${now} **Reason: ${reason}**`), member.roles.add('577139538938429443');
		  if(!member.roles.cache.some(r=>["577139713807482912"].includes(r.id)) )
		  return message.client.channels.cache.get(`585557517531348992`).send(`${member} Warned twice by Admin: ${message.author.username} ${now} **Reason: ${reason}**`), member.roles.add('577139713807482912');
		  member.roles.add('676374298763591690');
		  member.ban({ reason: 'Third warning: Banned by DreamerDog' })
		  message.client.channels.cache.get(`585557517531348992`).send(`I banned ${member} from the server as he/she just got their third warning by Admin: ${message.author.username}. **Reason: ${reason}**`);
		
	},
};