module.exports = {
	name: 'ban',
	description: 'Bans a user from the server. (Admin only)',
	usage: '[User] [Reason]',
	guildOnly: true,
	adminOnly: true,
	async execute(message, args) {
       
        let member = message.mentions.members.first();
        if(!member)
          return message.delete(), message.channel.send("Ehm, you didn't mention a valid member d0g.");
        if(!member.bannable) 
          return message.delete(), message.channel.send(`Ehm, I cannot ban this user! Do they have a higher role? Do I have ban permissions?`);
    
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";
        
        message.delete();
        member.roles.add('676374298763591690');
        await member.ban({ reason: `Banned by ${message.author.username}. Reason: ${reason}` })
        message.channel.send(`${member.user.tag} has been banned.`);

	},
};