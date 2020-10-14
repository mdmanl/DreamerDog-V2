module.exports = {
    name: 'skip',
    aliases: ['next'],
	cooldown: 5,
    description: 'Skips a song',
    guildOnly: true,
	async execute(message, args, con, options, client) {

        var guildIDData = options.active.get(message.guild.id);

        if (!guildIDData) return message.channel.send("**I am not playing music.**");

        if(message.member.voice.channel != message.guild.me.voice.channel) return message.reply(`You have to be in the same voice channel to use this command.`);

        if(message.member.hasPermission("KICK_MEMBERS")) {

            message.channel.send(`**Skipping.**`);

            return guildIDData.dispatcher.emit("finish");

        }

        var amountUsers = message.member.voice.channel.members.size;
        
        var amountSkip = Math.ceil(amountUsers / 2);

        if(!guildIDData.queue[0].voteSkips) guildIDData.queue[0].voteSkips = [];

        if(guildIDData.queue[0].voteSkips.includes(message.member.id)) return message.reply(`**You already voted.**`);

        guildIDData.queue[0].voteSkips.push(message.member.id);
        options.active.set(message.guild.id, guildIDData);

        if(guildIDData.queue[0].voteSkips.length >= amountSkip) {

            message.channel.send(`**${amountSkip}/${amountSkip} users voted, skipping.**`);

            return guildIDData.dispatcher.emit("finish");

        }

        message.channel.send(`**${message.author.username} voted for a skip. ${guildIDData.queue[0].voteSkips.length}/${amountSkip}**`); 

        
    },
};
