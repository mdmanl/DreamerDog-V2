module.exports = {
    name: 'newyear',
    aliases: ['2021'],
	cooldown: 10,
	description: 'Shows how many days until New Year 2021.',
	execute(message) {

        var newyear = 1609452000000;

        var now = Date.now();

        var distance = newyear - now;

        if (distance < 0) return message.channel.send(`:tada: Happy New Year!! :tada:`)

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        message.channel.send(`:tada: **Time until 2021:** ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds.`);
        
	},
};