const nodeDate = require('date-and-time');
const mysql = require("mysql");
const database = require("../database.json");
const { admins, warningChannel, warnedonceRole, warnedtwiceRole } = require('../config.json');

module.exports = {
	name: 'unwarn',
	description: 'unwarns a user. (Admin only)',
	usage: '[User]',
	guildOnly: true,
	adminOnly: true,
	async execute(message, args) {
		
		let member = message.mentions.members.first();

		const astridGasp = message.client.emojis.cache.get("591044479444844545");

		var con = mysql.createConnection({

            host: database.host,
            user: database.user,
            password: database.password,
            database: "haix_warnings"        

		});
				
		if(!member) return message.delete(), message.channel.send(`You didn't tag a valid m0mber ${astridGasp}`);

		con.connect(err => {

        	if(err) throw err;

		});
		
	
		con.query(`SELECT * FROM data WHERE memberID = '${member.id}'` , (err , rows) => {

			if(err) throw err;

            if (rows.length < 1) return message.channel.send(`${member.user.tag} doesn't have an active warning.`);

            else {

			let activeWarns = rows[0].activeWarns;

			if (activeWarns == 1) {
                member.roles.remove(warnedonceRole);
				message.channel.send(`${member.user.tag} has been unwarned.`)
				con.query(`SELECT * FROM data WHERE memberID = '${member.id}'`, (err, rows) => {

					if(err) throw err;

					if (rows.length >= 1) {

						con.query(`DELETE FROM data WHERE memberID = '${member.id}'`);

					}
				})
			}

			if (activeWarns == 2) {
                member.roles.remove(warnedonceRole);
				member.roles.remove(warnedtwiceRole);
				message.channel.send(`${member.user.tag} has been unwarned.`)
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