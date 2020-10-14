const discord = require('discord.js');
const ytdl = require('ytdl-core');
const emoji = require("../emoji.json");

module.exports = {
    name: 'play',
    aliases: ['song'],
	cooldown: 5,
    description: 'Plays a song from Youtube',
    args: true,
    guildOnly: true,
	async execute(message, args, con, options, client) {

        if(!message.member.voice.channel) return message.reply(`You have to be in a voice channel to use this command.`);

        var validate = await ytdl.validateURL(args[0]);
        if (!validate) return message.reply(`Oops, please use a valid Youtube URL.`);

        var info = await ytdl.getInfo(args[0]);

        var data = options.active.get(message.guild.id) || {};

        if(!data.connection) data.connection = await message.member.voice.channel.join();

        if(!data.queue) data.queue = [];

        data.guildID = message.guild.id;

        data.queue.push({

            songTitle: info.title,
            requester: message.author.tag,
            url: args[0],
            announceChannel: message.channel.id

        });

        if(!data.dispatcher){
            Play(client, options, data);
        }

        else {
            if(message.guild.me.voice.channelID != message.member.voice.channelID) return message.reply(`You have to be in the same voice channel to use this command.`);
            message.channel.send(`**${info.title} added to queue.**`);
        }

        options.active.set(message.guild.id, data);
    
    },
};

async function Play(client, ops, data) {
    client.channels.cache.get(data.queue[0].announceChannel).send(`${emoji.catrainbowjam} **Now playing: ${data.queue[0].songTitle}**`);
    
    var options = { seek: 0, volume: 1, bitrate: 128000 };

    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter: 'audioonly'}), options);

    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('finish', function () {
        Finish(client, ops, this);
    })
}



function Finish(client, ops, dispatcher) {

    var fetchedData = ops.active.get(dispatcher.guildID);

    fetchedData.queue.shift();

    if(fetchedData.queue.length > 0) {

        ops.active.set(dispatcher.guildID, fetchedData);

        Play(client, ops, fetchedData);
    }
    else {
        ops.active.delete(dispatcher.guildID);
        
        var voiceChannel = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;

        if (voiceChannel) voiceChannel.leave();

    }

}

