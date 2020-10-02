const fs = require('fs');
const Discord = require('discord.js');
const { prefix, owner, admins, token, warnedonceRole, warnedtwiceRole } = require('./config.json');
const database = require("./database.json");
const mysql = require("mysql");


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	client.user.setActivity('www.HaiX.best', { type: 'WATCHING' })
	console.log('DreamerDog initialized & ready!');
});

client.on('guildMemberAdd', member => {

	var con = mysql.createConnection({

		host: database.host,
		user: database.user,
		password: database.password,
		database: "haix_warnings"        

	});

	con.connect(err => {

		if(err) throw err;

	});

	con.query(`SELECT activeWarns FROM data WHERE memberID = '${member.id}'` , (err , rows) => {

		if(err) throw err;

		if (rows.length < 1) return;

		else {

		let activeWarns = rows[0].activeWarns

		if (activeWarns == 2) {
			member.roles.add(warnedonceRole);
			member.roles.add(warnedtwiceRole);
			member.send(`Welcome back! But your time in Gulag isn't over yet, so I gave your role(s) back`);

		} 
		
		if (activeWarns == 1) {
			member.roles.add(warnedonceRole);
			member.send(`Welcome back! But your time in Gulag isn't over yet, so I gave your role(s) back`);
		}
	}
	})
});

client.on('message', async message => {
	if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;


	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply(`I can't execute that command inside DMs!`);
	}

	if (command.ownerOnly && message.author.id !== owner) {
		return message.reply('This command is owner only!');
	}

	if (command.adminOnly && !message.member.roles.cache.some(r=>admins.includes(r.name)) ) {
		return message.reply('This command is admin only!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 0) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);