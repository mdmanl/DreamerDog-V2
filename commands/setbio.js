module.exports = {
	name: 'setbio',
    description: 'Sets your own bio.',
    cooldown: 10,
    guildOnly: true,
    args: true,
	async execute(message, args, con) {

        userBio = args.join(" ");
        if (userBio.length >= 50) return message.channel.send("Oops, your bio can be max 50 characters long.");

        con.query(`SELECT * FROM users WHERE memberID = '${message.author.id}'` , (err , rows) => {

            if(err) throw err;
            if (rows.length < 1) {
                con.query(`INSERT INTO users (memberID,bio) VALUES ("${message.author.id}","${userBio}")`);
                message.channel.send('Your bio has been set!')
            } else {
                con.query(`UPDATE users SET bio = '${userBio}' WHERE memberID = '${message.author.id}'`);
                message.channel.send('Your bio has been updated!')
            }

        })
	},
};