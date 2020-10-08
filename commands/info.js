const { version } = require('../config.json');

module.exports = {
	name: 'info',
	cooldown: 10,
	description: 'Shows information about the bot and version.',
	execute(message) {
		message.channel.send(`Sup dog! I am DreamerDog ${version} <a:pepesaber:752499405814497342>\nI am a private bot for **Haix** created by **MDMA** with Node.js, JavaScr0pt, MySQL, PHP and lots of love!`);
	},
};