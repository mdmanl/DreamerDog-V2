module.exports = {
	name: 'info',
	cooldown: 5,
	description: 'Shows information about the bot and version.',
	execute(message) {
		message.channel.send(`Sup dog! I am DreamerDog 2.0 <a:pepesaber:752499405814497342>\nI am a private bot for **Haix** created by **MDMA** with Node.js, JavaScript, PHP and lots of love!`);
	},
};