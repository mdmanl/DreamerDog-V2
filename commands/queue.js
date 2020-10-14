const emoji = require("../emoji.json");

module.exports = {
    name: 'queue',
    aliases: ['playlist'],
	cooldown: 5,
    description: 'Shows the current playlist.',
    guildOnly: true,
	async execute(message, args, con, options, client) {
        
        var guildIDData = options.active.get(message.guild.id);

        if (!guildIDData) return message.channel.send("**Playlist is empty.**");

        var queue = guildIDData.queue;
        var nowPlaying = queue[0];

        var response = `${emoji.catrainbowjam} **Now playing: ${nowPlaying.songTitle}**\n\nQueue:\n`;

        for (let index = 0; index < queue.length; index++) {

            if (index == "0") indexNr = "**->**"
            else indexNr = `[${index}]`;

            response += `${indexNr} ${queue[index].songTitle}\n`;

        }

        message.channel.send(response);
   
    },
};