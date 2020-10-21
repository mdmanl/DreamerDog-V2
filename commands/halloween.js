module.exports = {
    name: 'halloween',
	cooldown: 10,
	description: 'Shows how many days until Halloween.',
	execute(message) {

        var halloween = 1604181600000;

        var now = Date.now();

        var distance = halloween - now;

        if (distance < 0) return message.channel.send(`:ghost: Happy Halloween :ghost:`)

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        message.channel.send(`:ghost: **Time until Halloween:** ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds.`);
        
	},
};