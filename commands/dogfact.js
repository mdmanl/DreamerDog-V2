const axios = require('axios');

module.exports = {
    name: 'dogfact',
    aliases: ['fact'],
	cooldown: 5,
	description: 'Shows a random dog fact.',
	async execute(message) {
        let getDogfact = async () => {
            let response = await axios.get('https://some-random-api.ml/facts/dog');
            let Dogfact = response.data;
            return Dogfact;
          }
          let DogfactValue = await getDogfact();
          message.channel.send(`${DogfactValue.fact}`)   
    },
};