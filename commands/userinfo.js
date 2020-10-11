const { guildID } = require('../config.json');

module.exports = {
    name: 'userinfo',
    aliases: ['ui', 'bio'],
    cooldown: 30,
    guildOnly: true,
	description: 'Shows information about the user tagged or yourself',
	execute(message, args, con) {

        let member = message.mentions.members.first();

        let guild = message.client.guilds.cache.get(guildID)
		
        if(!member) {

            con.query(`SELECT * FROM users WHERE memberID = '${message.author.id}'`, (err, rows) => {

                if(err) throw err;
           
                if (rows.length >= 1) {
                    userBio = rows[0].bio;
                } else {
                    userBio = "No bio set."
                }       
            })
            
            con.query(`SELECT * FROM warnings WHERE memberID = '${message.author.id}'` , (err , rows) => {

                if(err) throw err;

        
                memberJoined = message.member.joinedAt.toLocaleString('en-US',{year: 'numeric', month: 'short', day: '2-digit'})
    
                if (rows.length >= 1) {
                        activeWarns = rows[0].activeWarns;

                        adminID = guild.members.cache.get(rows[0].admin);
                        admin = adminID.user.username
    
                    expiryDate = new Date(rows[0].expiryDate);
                        expiryDate = expiryDate.toLocaleString('en-US',{year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'});
                            
                    if (activeWarns == 1) {
                        message.channel.send(`**${message.author.tag}**\nJoined on: **${memberJoined}**\nBio: **${userBio}**\nHas **1** active warning:\nLast warn by: **${admin}**\nReason: **${rows[0].reason}**\nEnds on: **${expiryDate} (GMT+1)**`);
                    }
    
                    if (activeWarns == 2) {
                        message.channel.send(`**${message.author.tag}**\nJoined on: **${memberJoined}**\nBio: **${userBio}**\nHas **2** active warnings:\nLast warn by: **${admin}**\nReason: **${rows[0].reason}**\nEnds on: **${expiryDate} (GMT+1)**`);
                    }
                                
                } else {
                    message.channel.send(`**${message.author.tag}**\nJoined on: **${memberJoined}**\nBio: **${userBio}**\nHas no active warnings.`)
                }  
            })

        } else {

            con.query(`SELECT * FROM users WHERE memberID = '${member.id}'`, (err, rows) => {

                if(err) throw err;

                if (rows.length >= 1) {
                    userBio = rows[0].bio;
                } else {
                    userBio = "No bio set."
                }
                
            })

		con.query(`SELECT * FROM warnings WHERE memberID = '${member.user.id}'` , (err , rows) => {

            if(err) throw err;


            memberJoined = member.joinedAt.toLocaleString('en-US',{year: 'numeric', month: 'short', day: '2-digit'})

            if (rows.length >= 1) {
                activeWarns = rows[0].activeWarns;

                adminID = guild.members.cache.get(rows[0].admin);
                admin = adminID.user.username

                expiryDate = new Date(rows[0].expiryDate);
                expiryDate = expiryDate.toLocaleString('en-US',{year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'});

                	
                if (activeWarns == 1) {
                    message.channel.send(`**${member.user.tag}**\nJoined on: **${memberJoined}**\nBio: **${userBio}**\nHas **1** active warning:\nLast warn by: **${admin}**\nReason: **${rows[0].reason}**\nEnds on: **${expiryDate} (GMT+1)**`);
                }

                if (activeWarns == 2) {
                    message.channel.send(`**${member.user.tag}**\nJoined on: **${memberJoined}**\nBio: **${userBio}**\nHas **2** active warnings:\nLast warn by: **${admin}**\nReason: **${rows[0].reason}**\nEnds on: **${expiryDate} (GMT+1)**`);
                }
                            
            } else {
                message.channel.send(`**${member.user.tag}**\nJoined on: **${memberJoined}**\nBio: **${userBio}**\nHas no active warnings.`)
            }
        })
    }
	},
};