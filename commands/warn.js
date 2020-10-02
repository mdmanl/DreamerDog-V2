const nodeDate = require('date-and-time');
const mysql = require("mysql");
const database = require("../database.json");
const { admins, warningChannel, warnedonceRole, warnedtwiceRole } = require('../config.json');

module.exports = {
	name: 'warn',
	aliases: ['warning'],
	description: 'Warns a user. (Admin only)',
	usage: '[User] [Reason]',
	guildOnly: true,
	adminOnly: true,
	async execute(message, args) {
		
		let member = message.mentions.members.first();

		const astridGasp = message.client.emojis.cache.get("591044479444844545");
		const pepeBoomer = message.client.emojis.cache.get("660450393481936896");

		var con = mysql.createConnection({

            host: database.host,
            user: database.user,
            password: database.password,
            database: "haix_warnings"        

		});
				
		if(!member) return message.delete(), message.channel.send(`You didn't tag a valid m0mber ${astridGasp}`);

		if(member.roles.cache.some(r=>admins.includes(r.name)) ) return message.delete(), message.channel.send(pepeBoomer);
		 
		let reason = args.slice(1).join(' ');
		if(!reason) return message.delete(), message.channel.send(`Reason? ${astridGasp}`);

		con.connect(err => {

        	if(err) throw err;

		});
		
		let now = nodeDate.format(new Date(), 'HH:mm [GMT+1] DD[th] of MMMM');
		expiryDate = Date.now() + 1000*60*60*24*7;
	
		con.query(`SELECT * FROM data WHERE memberID = '${member.id}'` , (err , rows) => {

			if(err) throw err;

			if(rows[0] == null) {

				member.roles.add(warnedonceRole);
				message.client.channels.cache.get(warningChannel).send(`${member} Warned once by Admin: ${message.author.username} ${now} **Reason: ${reason}**`);
				message.channel.send(`${member.user.tag} has been warned.`)
				con.query(`SELECT * FROM data WHERE memberID = '${member.id}'`, (err, rows) => {

					if(err) throw err;

					if (rows.length < 1) {

						con.query(`INSERT INTO data (memberID,reason,expiryDate,admin,activeWarns) VALUES ("${member.user.id}","${reason}","${expiryDate}","${message.author.username}","1")`);

					}
				})				
			}

			else {

			let activeWarns = rows[0].activeWarns;

			if (activeWarns == 1) {
				member.roles.add(warnedtwiceRole);
				message.client.channels.cache.get(warningChannel).send(`${member} Warned twice by Admin: ${message.author.username} ${now} **Reason: ${reason}**`);
				message.channel.send(`${member.user.tag} has been warned.`)
				con.query(`SELECT * FROM data WHERE memberID = '${member.id}'`, (err, rows) => {

					if(err) throw err;

					if (rows.length >= 1) {

					con.query(`UPDATE data SET reason = '${reason}', expiryDate = '${expiryDate}', admin = '${message.author.username}', activeWarns = '2' WHERE memberID = '${member.id}'`);

					}
				})
			}

			if (activeWarns == 2) {
				member.ban({ reason: 'Banned by DreamerDog: third warning.' });
				message.client.channels.cache.get(warningChannel).send(`${member.user.tag} just got banned as he or she got a third warning. Don't be like ${member.user.tag}. **Reason: ${reason}**`);
				message.channel.send(`${member.user.tag} has been warned.`)
				con.query(`SELECT * FROM data WHERE memberID = '${member.id}'`, (err, rows) => {

					if(err) throw err;

					if (rows.length >= 1) {

						con.query(`DELETE FROM data WHERE memberID = '${member.id}'`);
					}
				})		
			}
		}
		})
	},
};