const { admins } = require('../config.json');
const emoji = require("../emoji.json");

module.exports = {
	name: 'ban',
	description: 'bans a user. (Admin only)',
	usage: '[User] [Reason]',
	guildOnly: true,
	adminOnly: true,
	async execute(message, args) {
		
		let member = message.mentions.members.first();			
		if(!member) return message.channel.send(`You didn't tag a valid m0mber ${emoji.astridgasp}`);
		if(member.roles.cache.some(r=>admins.includes(r.name)) ) return message.channel.send(`${emoji.pepeboomer}`);
		 
		let reason = args.slice(1).join(' ');
    	if(!reason) reason = "No reason provided";
    
    	member.ban({ reason: `Banned by ${message.author.username}. Reason: ${reason}` })
    	message.channel.send(`${member.user.tag} has been banned.`);
	},
};