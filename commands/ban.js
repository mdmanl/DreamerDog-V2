const cfg = require("../config.json");
const emoji = require("../emoji.json");

module.exports = {
	name: 'ban',
	description: 'bans a user. (Admin only)',
	usage: '[User] [Reason]',
	guildOnly: true,
	adminOnly: true,
	async execute(message, args, con) {
		
		let member = message.mentions.members.first();			
		if(!member) return message.channel.send(`You didn't tag a valid m0mber ${emoji.astridgasp}`);
		if(member.roles.cache.some(r=>cfg.admins.includes(r.name)) ) return message.channel.send(`${emoji.pepeboomer}`);
		if(member.user.bot) return message.channel.send("You can't ban bots you silly!");
		 
		let reason = args.slice(1).join(' ');
    	if(!reason) reason = "No reason provided";
    
		member.ban({ reason: `Banned by ${message.author.username}. Reason: ${reason}` })
		message.delete();
		message.channel.send(`${member.user.tag} has been banned.`);
		message.client.channels.cache.get(cfg.warningChannel).send(`${member.user.tag} has been banned. **Reason: ${reason}**`);
		con.query(`UPDATE stats SET bans = bans + 1 WHERE id = '1'`);
	},
};