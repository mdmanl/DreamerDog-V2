module.exports = {
    name: 'xmas',
    aliases: ['christmas'],
	cooldown: 10,
	description: 'Shows how many days until Christmas.',
	execute(message) {

        var christmas = 1608847200000;

        var now = Date.now();

        var distance = christmas - now;

        if (distance < 0) return message.channel.send(`:christmas_tree: Merry Christmas! :christmas_tree:`)

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        message.channel.send(`:christmas_tree: **Time until Christmas:** ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds.`);
        
	},
};