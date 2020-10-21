const Discord = require("discord.js");

module.exports = {
	name: 'stats',
	description: `Shots DreamerDog's stats`,
	guildOnly: true,
	async execute(message, args, con) {

        con.query(`SELECT * FROM stats WHERE id = '1'` , (err , rows) => {

			if (err) throw err;
			
			activeWarns = rows[0].warns - rows[0].unwarns;

            var statsEmbed = new Discord.MessageEmbed()
			    .setColor('#73e600')
				.addField('Warns:', `${rows[0].warns}`, true)
				.addField('Active Warns:', `${activeWarns}`, true)
			    .addField('Kicks:', `${rows[0].kicks}`, true)
				.addField('Bans:', `${rows[0].bans}`, true)
				.addField('Members:', `${message.guild.memberCount}`, false)
                .setAuthor(`DreamerDog Stats since V2`)
                .setTimestamp()
			    .setFooter(`Requested by ${message.author.username}`)

		    message.channel.send(statsEmbed)


        })
	},
};