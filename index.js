const fs = require('fs');
const Discord = require('discord.js');
const cfg = require('./config.json');
const database = require("./database.json");
const mysql = require("mysql");
const activeSongs = new Map();
let NodeMonkey = require("node-monkey")
NodeMonkey()

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

console.log = function(log) {
    client.channels.cache.get("764621885626384415").send(log); 
}

const cooldowns = new Discord.Collection();

var con = mysql.createConnection({

	host: database.host,
	user: database.user,
	password: database.password,
	database: database.database        

});

client.once('ready', () => {

	con.connect(err => {

		if(err) throw err;
		console.log(`Database connection established.`);
		console.log(`DreamerDog version ${cfg.version} initialized & ready!`);
		console.log(`<@!614556845335642146> I just restarted. If you didn't do that, then something went wrong but I instantly restarted, so thats nice. But maybe you still better go and watch the logs :)`);

	});
	targetGuild = client.guilds.cache.get(cfg.guildID)
	client.user.setActivity(`${targetGuild.memberCount} members!`, { type: 'WATCHING' })

	setInterval(() => {
		client.user.setActivity(`${targetGuild.memberCount} members!`, { type: 'WATCHING' })
	  }, 300000);
	  
    
	setInterval(() => {

		now = Date.now();

        con.query(`SELECT * FROM warnings WHERE expiryDate < '${now}' ORDER BY id` , (err , rows) => {
            if (err) throw err;

            if (rows.length > 0) {
                for (var i = 0; i < rows.length; i++) {
					let guild = client.guilds.cache.get(cfg.guildID)
					member = guild.members.cache.get(rows[i].memberID);
					var leftUser = rows[i].memberID;
					var activeWarns = rows[i].activeWarns;

					if (typeof member == "undefined") return con.query(`DELETE FROM warnings WHERE memberID = '${leftUser}'`), con.query(`UPDATE stats SET unwarns = unwarns + 1 WHERE id = '1'`);
	
                    if (activeWarns == 1) {
                        member.roles.remove(cfg.warnedonceRole);
						member.send("Your warning on the HaiX Discord Server has been finished.");
							var unwarnEmbed = new Discord.MessageEmbed()
							.setColor('#73e600')
							.setTitle(`${member.user.tag} was released from Gulag.`)
							.addField('Released by:', 'DreamerDog', false)
							.addField('Reason:', 'Warning Expired', false)
							.setAuthor(`User Warning Removed`, member.user.displayAvatarURL(), '')
							.setTimestamp()
							client.channels.cache.get(cfg.logChannel).send(unwarnEmbed)
						con.query(`DELETE FROM warnings WHERE memberID = '${member.id}'`);
                    }

                    if (activeWarns == 2) {
                        member.roles.remove(cfg.warnedonceRole);
                        member.roles.remove(cfg.warnedtwiceRole);
						member.send("Your warnings on the HaiX Discord Server has been finished.");
						var unwarnEmbed = new Discord.MessageEmbed()
							.setColor('#73e600')
							.setTitle(`${member.user.tag} was released from Gulag.`)
							.addField('Released by:', 'DreamerDog', false)
							.addField('Reason:', 'Warning Expired', false)
							.setAuthor(`User Warning Removed`, member.user.displayAvatarURL(), '')
							.setTimestamp()
						client.channels.cache.get(cfg.logChannel).send(unwarnEmbed)
						con.query(`DELETE FROM warnings WHERE memberID = '${member.id}'`);
                    }
                }
            }
        })  
    }, 5000);
});

client.on('guildMemberAdd', member => {

	con.query(`SELECT activeWarns FROM warnings WHERE memberID = '${member.id}'` , (err , rows) => {

		if(err) throw err;

		if (rows.length < 1) return;

		else {
			let activeWarns = rows[0].activeWarns

			if (activeWarns == 2) {
				member.roles.add(cfg.warnedonceRole);
				member.roles.add(cfg.warnedtwiceRole);
				member.send(`Welcome back! But your time in Gulag isn't over yet, so I gave your role(s) back`);
			} 
		
			if (activeWarns == 1) {
					member.roles.add(cfg.warnedonceRole);
					member.send(`Welcome back! But your time in Gulag isn't over yet, so I gave your role(s) back`);
			}
		}
	})
});

client.on('message', async message => {
	if (!message.content.toLowerCase().startsWith(cfg.prefix) || message.author.bot) return;


	const args = message.content.slice(cfg.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply(`I can't execute that command inside DMs!`);
	}

	if (command.ownerOnly && message.author.id !== cfg.owner) {
		return message.reply('This command is owner only!');
	}

	if (command.adminOnly && !message.member.roles.cache.some(r=>cfg.admins.includes(r.name)) ) {
		return message.reply('This command is admin only!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${cfg.prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	var cooldownAmount = (command.cooldown || 0) * 1000;


	if (message.channel.type !== 'dm') {
		if (message.member.roles.cache.some(r=>cfg.admins.includes(r.name)) ) cooldownAmount = (0);
	}
	


	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	var options = {
		active: activeSongs
	};

	try {
		command.execute(message, args, con, options, client);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(cfg.token);