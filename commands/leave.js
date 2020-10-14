const discord = require('discord.js');
const ytdl = require('ytdl-core');
const emoji = require("../emoji.json");

module.exports = {
    name: 'leave',
    aliases: ['fuckoff'],
	cooldown: 5,
    description: 'Makes the bot leave your voice channel',
    guildOnly: true,
	async execute(message, args, con, options, client) {

        var guildIDData = options.active.get(message.guild.id);

        if(!message.guild.me.voice.channel) return message.reply(`I am not in a voice channel.`);
        if(!message.member.voice.channel) return message.reply(`You have to be in a voice channel to use this command.`);
        if(message.guild.me.voice.channelID != message.member.voice.channelID) return message.reply(`You have to be in the same voice channel to use this command.`);
        
        guildIDData.dispatcher.emit("finish");
        message.guild.me.voice.channel.leave();
        message.channel.send("**Disconnected.**")
   
	},
};