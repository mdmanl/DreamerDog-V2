module.exports = {
	name: 'warn',
	aliases: ['warning'],
	description: 'Warns a user.',
	guildOnly: true,
	adminOnly: true,
	execute(message) {
		var wOnce = message.member.guild.roles.find(role => role.id === "577139538938429443");
		var wTwice = message.member.guild.roles.find(role => role.id === "577139713807482912");
		var rBanned = message.member.guild.roles.find(role => role.id === "676374298763591690");
		let now = nodeDate.format(new Date(), 'HH:mm [GMT+1] DD[th] of MMMM');

		let member = message.mentions.members.first();
		if(!member)
		  return message.delete(), message.channel.send(":information_source: Ehm, you didn't mention a valid member d0g.")
		  .then(message => message.delete(5000));

		  let reason = args.slice(1).join(' ');
		  if(!reason) return message.delete(), message.channel.send(":information_source: Ehm, you forgot the reason d0g.")
		  .then(message => message.delete(5000));

		  message.delete();
		  message.channel.send(`${tickgreen} ${member.user.tag} has been warned.`)
		  .then(message => message.delete(3000));
		  if(!member.roles.some(r=>["577139538938429443"].includes(r.id)) )
		  return client.channels.get(`585557517531348992`).send(`${member} Warned once by Admin: ${message.author.username} ${now} **Reason: ${reason}**`), member.addRole(wOnce);
		  if(!member.roles.some(r=>["577139713807482912"].includes(r.id)) )
		  return client.channels.get(`585557517531348992`).send(`${member} Warned twice by Admin: ${message.author.username} ${now} **Reason: ${reason}**`), member.addRole(wTwice);
		  member.addRole(rBanned);
		  member.ban("Banned by DreamerDog after 2 warnings");
		  bot.channels.get(`585557517531348992`).send(`I banned ${member} from the server as he/she just got their third warning by Admin: ${message.author.username}. **Reason: ${reason}**`);
		
	},
};