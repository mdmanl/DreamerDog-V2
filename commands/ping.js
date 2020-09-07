module.exports = {
	name: 'ping',
	cooldown: 10,
	description: 'Shows if bot is online and latency.',
	guildOnly: true,
	execute(message) {
		message.channel.send("Pong! (hold on, processing latency...)").then(m => m.edit(`Pong! (Current latency is ${m.createdTimestamp - message.createdTimestamp}ms, while the API Latency is ${Math.round(message.guild.shard.ping)}ms)`) );
	},
};
