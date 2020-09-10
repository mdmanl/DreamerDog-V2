const Discord = require('discord.js');

module.exports = {
     name: 'follow',
    cooldown: 30,
    description: 'Follow HaiX',
	execute(message) {
        var eInvite = new Discord.MessageEmbed()
            .setColor('#bf2222')
            .setAuthor('Follow HaiX on:', "https://dreamerdog.haix.best/img/haix.png")
            .addFields(
                { name: 'YouTube', value: 'https://youtube.haix.best', inline: false },
                { name: 'Twitch', value: 'https://twitch.haix.best', inline: false },
                { name: 'Twitter', value: 'https://twitter.haix.best', inline: false },
                { name: 'Instagram', value: 'https://instagram.haix.best', inline: false },
            )
            .setTimestamp()
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL);

    message.channel.send(eInvite)
     
	},
};