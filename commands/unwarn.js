const { warnedonceRole, warnedtwiceRole, logChannel } = require('../config.json');
const emoji = require("../emoji.json");
const Discord = require("discord.js");

module.exports = {
	name: 'unwarn',
	description: 'unwarns a user. (Admin only)',
	usage: '[User]',
	guildOnly: true,
	adminOnly: true,
	async execute(message, args, con) {
		
		let member = message.mentions.members.first();
		if(!member) return message.channel.send(`You didn't tag a valid m0mber ${emoji.astridgasp}`);
	
		con.query(`SELECT * FROM warnings WHERE memberID = '${member.id}'` , (err , rows) => {
			if(err) throw err;
			
			if (rows.length < 1) return message.channel.send(`${member.user.tag} doesn't have an active warning.`);
			
			let reason = args.slice(1).join(' ');
			if(!reason) return message.channel.send(`Reason? ${emoji.astridgasp}`);

            else {

				let activeWarns = rows[0].activeWarns;

				if (activeWarns == 1) {
              	  member.roles.remove(warnedonceRole);
					message.channel.send(`${member.user.tag} has been unwarned.`);
					member.send(`Your warning got removed by ${message.author.username}`);
					con.query(`DELETE FROM warnings WHERE memberID = '${member.id}'`);
					var unwarnEmbed = new Discord.MessageEmbed()
						.setColor('#73e600')
						.setTitle(`${member.user.tag} was released from Gulag.`)
						.addField('Released by:', `${message.author.username}`, false)
						.addField('Reason:', `${reason}`, false)
						.setAuthor(`User Warning Removed`, member.user.displayAvatarURL(), '')
						.setTimestamp()
					message.client.channels.cache.get(logChannel).send(unwarnEmbed)
				}

				if (activeWarns == 2) {
               		member.roles.remove(warnedonceRole);
					member.roles.remove(warnedtwiceRole);
					message.channel.send(`${member.user.tag} has been unwarned.`);
					member.send(`Your warnings got removed by ${message.author.username}`);
					con.query(`DELETE FROM warnings WHERE memberID = '${member.id}'`);	
					var unwarnEmbed = new Discord.MessageEmbed()
							.setColor('#73e600')
							.setTitle(`${member.user.tag} was released from Gulag.`)
							.addField('Released by:', `message.author.username`, false)
							.addField('Reason:', `${reason}`, false)
							.setAuthor(`User Warning Removed`, member.user.displayAvatarURL(), '')
							.setTimestamp()
					message.client.channels.cache.get(logChannel).send(unwarnEmbed)
				}
			}
		})
	},
};