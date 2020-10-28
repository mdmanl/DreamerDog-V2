const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
    name: 'delete',
    aliases: ['elete'],
    cooldown: 10,
    guildOnly: true,
	description: `Delete someone`,
	async execute(message, args) {

        let member = message.mentions.members.first();
        if(!member) member = message.member;
        if(member == "735485193124577350") return message.channel.send(`Don't you dare to delete me!`);

        const canvas = Canvas.createCanvas(748, 356);
        const ctx = canvas.getContext('2d');
        
        const background = await Canvas.loadImage('./imgfun/delete.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
          
        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
        ctx.drawImage(avatar, 120, 137, 192, 192);
    
                    
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${member.user.username}_delete.png`);
        message.channel.send(attachment);

    },
};

