const nodeDate = require('date-and-time');
const cfg = require('../config.json');
const emoji = require("../emoji.json");

module.exports = {
	name: 'warn',
	aliases: ['warning'],
	description: 'Warns a user. (Admin only)',
	usage: '[User] [Reason]',
	guildOnly: true,
	adminOnly: true,
	async execute(message, args, con) {
		
		let member = message.mentions.members.first();
		if(!member) return message.channel.send(`You didn't tag a valid m0mber ${emoji.astridgasp}`);
		if(member.roles.cache.some(r=>cfg.admins.includes(r.name)) ) return message.channel.send(`${emoji.pepeboomer}`);
		if(member.user.bot) return message.channel.send("You can't warn bots you silly!");
		 
		let reason = args.slice(1).join(' ');
		if(!reason) return message.channel.send(`Reason? ${emoji.astridgasp}`);

		let wordArray = message.content.split(" ");
		let filterWords = [`"`, `\\`, '`', `_`, `~`];
        for (var i = 0; i < filterWords.length; i++) {
            if(wordArray.find(w => w.indexOf(filterWords[i]) >= 0)) {
				return message.channel.send("Oops, the reason contains unsupported characters.");
            }
        }

		let now = nodeDate.format(new Date(), 'HH:mm [GMT+1] DD[th] of MMMM');
		expiryDate = Date.now() + 1000*60*60*24*7;
	
		con.query(`SELECT * FROM warnings WHERE memberID = '${member.id}'` , (err , rows) => {

			if(err) throw err;

			if(rows[0] == null) {

				member.roles.add(cfg.warnedonceRole);
				message.client.channels.cache.get(cfg.warningChannel).send(`${member} Warned once by Admin: ${message.author.username} ${now} **Reason: ${reason}**`);
				message.channel.send(`${member.user.tag} has been warned.`)
				con.query(`INSERT INTO warnings (memberID,reason,expiryDate,admin,activeWarns) VALUES ("${member.user.id}","${reason}","${expiryDate}","${message.author.id}","1")`);
				con.query(`UPDATE stats SET warns = warns + 1 WHERE id = '1'`);
			}

			else {

				let activeWarns = rows[0].activeWarns;

				if (activeWarns == 1) {
					member.roles.add(cfg.warnedtwiceRole);
					message.client.channels.cache.get(cfg.warningChannel).send(`${member} Warned twice by Admin: ${message.author.username} ${now} **Reason: ${reason}**`);
					message.channel.send(`${member.user.tag} has been warned.`)
					con.query(`UPDATE warnings SET reason = '${reason}', expiryDate = '${expiryDate}', admin = '${message.author.id}', activeWarns = '2' WHERE memberID = '${member.id}'`);
					con.query(`UPDATE stats SET warns = warns + 1 WHERE id = '1'`);
				}

				if (activeWarns == 2) {
					member.ban({ reason: 'Banned by DreamerDog: third warning.' });
					message.client.channels.cache.get(cfg.warningChannel).send(`${member.user.tag} just got banned as he or she got a third warning. Don't be like ${member.user.tag}. **Reason: ${reason}**`);
					message.channel.send(`${member.user.tag} has been warned.`)
					con.query(`DELETE FROM warnings WHERE memberID = '${member.id}'`);
					con.query(`UPDATE stats SET warns = warns + 1 WHERE id = '1'`);	
					con.query(`UPDATE stats SET bans = bans + 1 WHERE id = '1'`);
				}
			}
		})
	},
};