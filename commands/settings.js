const Discord = require('discord.js');
const cfg = require("../config.json");

module.exports = {
    name: 'settings',
    aliases: ['cfg'],
	cooldown: 30,
	description: 'Shows CS:GO settings of HaiX.',
	async execute(message, args, con) {

        if (args[0] == "update") {

            if(!message.member.roles.cache.some(r=>cfg.admins.includes(r.name)) ) return message.channel.send(`You don't have the permission to do this!`);

            let setting = parseInt(args[1])
            if(!setting) return message.channel.send("Choose a setting to edit..");

            if(setting == 1) setting = "viewmodel"
            if(setting == 2) setting = "crosshair"
            if(setting == 3) setting = "sens"
            if(setting == 4) setting = "brightness"
            if(setting == 5) setting = "aratio"
            if(setting == 6) setting = "res"
            if(setting == 7) setting = "shadow"
            if(setting == 8) setting = "mtdetail"
            if(setting == 9) setting = "effectdetail"
            if(setting == 10) setting = "shaderdetail"
            if(setting == 11) setting = "multicore"
            if(setting == 12) setting = "multisampling"
            if(setting == 13) setting = "fxaa"
            if(setting == 14) setting = "texturefiltermode"
            if(setting == 15) setting = "waitsync"
            if(setting == 16) setting = "motionblur"
            if(setting >= 17) return message.channel.send('Invalid setting.')
            if(setting < 1) return message.channel.send('Invalid setting.')
  
            let value = args.slice(2).join(' ');
            if(!value) return message.channel.send(`Setting value can't be empty.`)

            updateDate = Date.now()

            con.query(`UPDATE cs_settings SET ${setting} = '${value}', lastupdate = '${updateDate}' WHERE id = '1'`);

            message.channel.send(`You updated ${setting}`)
        

        }

        else { 

            con.query(`SELECT * FROM cs_settings WHERE id = '1'` , (err , rows) => {

                if (err) throw err;

                lastUpdate = new Date(rows[0].lastupdate);
                lastUpdate = lastUpdate.toLocaleString('en-US',{year: 'numeric', month: 'short', day: '2-digit'});
       
                var eSettings = new Discord.MessageEmbed()
                    .setColor('#bf2222')
                    .setAuthor(`HaiX CS:GO Settings`, 'https://dreamerdog.haix.best/img/haix.png', '')
                    .setThumbnail('https://dreamerdog.haix.best/img/haix.gif')
                    .addField('Viewmodel:', rows[0].viewmodel, true)
                    .addField('Crosshair:', rows[0].crosshair, true)
                    .addField('Sensitivity:', rows[0].sens, true)
                    .addField('Brightness:', rows[0].brightness, true)
                    .addField('Aspect Ratio:', rows[0].aratio, true)
                    .addField('Resolution:', rows[0].res, true)
                    .addField('Shadow Quality:', rows[0].shadow, true)
                    .addField('Model/Texture Detail:', rows[0].mtdetail, true)
                    .addField('Effect Detail:', rows[0].effectdetail, true)
                    .addField('Shader Detail:', rows[0].shaderdetail, true)
                    .addField('Multicore Rendering:', rows[0].multicore, true)
                    .addField('Multisampling Anti-Aliasing Mode:', rows[0].multisampling, true)
                    .addField('FXAA Anti-Aliasing:', rows[0].fxaa, true)
                    .addField('Texture Filtering Mode:', rows[0].texturefiltermode, true)
                    .addField('Wait for Vertical Sync:', rows[0].waitsync, true)
                    .addField('Motion Blur:', rows[0].motionblur, true)
                    .setFooter(`Last update: ${lastUpdate}`)
                message.channel.send(eSettings)

            }
        )}
    },
};