const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
    name: 'spank',
    cooldown: 10,
    guildOnly: true,
	description: `Spank someone`,
	async execute(message, args) {

        let member = message.mentions.members.first();
        if(!member) {

            message.reply(`Tag the person you want to spank.`);

        } else {

            const canvas = Canvas.createCanvas(741, 619);
            const ctx = canvas.getContext('2d');
        
            const background = await Canvas.loadImage('./spank.jpg');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
            ctx.strokeStyle = '#74037b';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
            const avatarSpanker = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
            ctx.drawImage(avatarSpanker, 320, 30, 128, 128);
          
            const avatarSpankee = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
            ctx.drawImage(avatarSpankee, 540, 180, 128, 128);
    
                    
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${message.author.username}_spanks_${member.user.username}.png`);
    
            message.channel.send(attachment);

        }


    
    },
};

