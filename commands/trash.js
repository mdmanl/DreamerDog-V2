const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
    name: 'trash',
    cooldown: 10,
    guildOnly: true,
	description: `Trash someone`,
	async execute(message, args) {

        let member = message.mentions.members.first();
        if(!member) {

            const canvas = Canvas.createCanvas(960, 960);
            const ctx = canvas.getContext('2d');
        
            const background = await Canvas.loadImage('./trash.png');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
            ctx.strokeStyle = '#74037b';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
          
            const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'png' }));
            ctx.drawImage(avatar, 480, 0, 480, 481);

            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'trash.png');

        
            message.channel.send(attachment);

        } else {

            const canvas = Canvas.createCanvas(960, 960);
            const ctx = canvas.getContext('2d');
        
            const background = await Canvas.loadImage('./trash.png');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
            ctx.strokeStyle = '#74037b';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
          
            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
            ctx.drawImage(avatar, 480, 0, 480, 481);
    
                    
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'trash.png');
    
            message.channel.send(attachment);

        }


    
    },
};

