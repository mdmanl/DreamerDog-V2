const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
    name: 'settings',
    aliases: ['cfg'],
	cooldown: 30,
	description: 'Shows CS:GO settings of HaiX.',
	async execute(message) {
        let getSettings = async () => {
        let response = await axios.get('https://dreamerdog.haix.best/settings');
        let settings = response.data;
        return settings;
    }

        let SV = await getSettings();
        var eSettings = new Discord.MessageEmbed()
            .setColor('#bf2222')
            .setAuthor(`HaiX CS:GO Settings`, 'https://dreamerdog.haix.best/img/haix.png', '')
            .setThumbnail('https://dreamerdog.haix.best/img/haix.png')
            .addField('Viewmodel:', SV.viewmodel, true)
            .addField('Crosshair:', SV.crosshair, true)
            .addField('Sensitivity:', SV.sens, true)
            .addField('Brightness:', SV.brightness, true)
            .addField('Aspect Ratio:', SV.aratio, true)
            .addField('Resolution:', SV.res, true)
            .addField('Shadow Quality:', SV.shadow, true)
            .addField('Model/Texture Detail:', SV.mtdetail, true)
            .addField('Effect Detail:', SV.effectdetail, true)
            .addField('Shader Detail:', SV.shaderdetail, true)
            .addField('Multicore Rendering:', SV.multicore, true)
            .addField('Multisampling Anti-Aliasing Mode:', SV.multisampling, true)
            .addField('FXAA Anti-Aliasing:', SV.fxaa, true)
            .addField('Texture Filtering Mode:', SV.texturefiltermode, true)
            .addField('Wait for Vertical Sync:', SV.waitsync, true)
            .addField('Motion Blur:', SV.motionblur, true)
            .setFooter(`Last update: ${SV.lastupdate}`)
        message.channel.send(eSettings)
    },
};