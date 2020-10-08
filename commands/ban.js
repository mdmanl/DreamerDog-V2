const { admins } = require('../config.json');

module.exports = {
	name: 'ban',
	description: 'bans a user. (Admin only)',
	usage: '[User] [Reason]',
	guildOnly: true,
	adminOnly: true,
	async execute(message, args) {
		
		let member = message.mentions.members.first();

		const astridGasp = message.client.emojis.cache.get("761339495379369996");
		const pepeBoomer = message.client.emojis.cache.get("763147736241406013");
			
		if(!member) return message.delete(), message.channel.send(`You didn't tag a valid m0mber ${astridGasp}`);

		if(member.roles.cache.some(r=>admins.includes(r.name)) ) return message.delete(), message.channel.send(`${pepeBoomer}`);
		 
		let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    message.delete();
    member.ban({ reason: `Banned by ${message.author.username}. Reason: ${reason}` })
    message.channel.send(`${member.user.tag} has been banned.`);
	},
};