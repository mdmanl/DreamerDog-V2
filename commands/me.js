module.exports = {
	name: 'me',
	cooldown: 30,
	description: 'Shows information about yourself.',
	execute(message, args, con) {

		con.query(`SELECT * FROM warnings WHERE memberID = '${message.author.id}'` , (err , rows) => {

            if(err) throw err;

            memberJoined = message.member.joinedAt.toLocaleString('en-US',{year: 'numeric', month: 'short', day: '2-digit'})

            if (rows.length >= 1) {

                activeWarns = rows[0].activeWarns;

                expiryDate = new Date(rows[0].expiryDate);

                expiryDate = expiryDate.toLocaleString('en-US',{year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'});

                	
                if (activeWarns == 1) {

                    message.channel.send(`You joined this server on: **${memberJoined}**\nYou have **1** active warning.\nWarned by: **${rows[0].admin}**\nReason: **${rows[0].reason}**\nEnds on: **${expiryDate} (GMT+1)**`);


                }

                if (activeWarns == 2) {
                    message.channel.send(`You joined this server on: **${memberJoined}**\nYou have **2** active warnings.\nLast warn by: **${rows[0].admin}**\nReason: **${rows[0].reason}**\nEnds on: **${expiryDate} (GMT+1)**`);
                }
                            
            } else {
                message.channel.send(`You joined this server on: **${memberJoined}**\nYou don't have an active warning.`)
            }

        })
	},
};