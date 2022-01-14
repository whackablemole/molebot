const fetch = require('node-fetch');
const active = require('../helpers/active');
const ActiveStatus = require('../models/ActiveStatus');

module.exports = {
	name: "dadjoke",
	description: "A command for returning a random dad joke from the icanhazdadjokes API.",
	execute(message, args) {

		const { activate, deactivate, getStatus, isActive } = active;

        async function getJoke(message) {
			// Don't go any further if this isn't active
			if (!(await isActive(message.guild.id, 'dadjoke'))) return;

			const dadjoke = await fetch("https://icanhazdadjoke.com/", {
				method: "GET",
				headers: { Accept: "application/json" },
				}).then(response => response.json()).catch(console.error);
	
			message.reply(dadjoke.joke).catch(console.error);

        }

		switch (args[0]) {
			case 'activate':
				activate(message, 'dadjoke');
				break;
			case 'deactivate':
				deactivate(message, 'dadjoke');
				break;
			case 'status':
				getStatus(message, 'dadjoke');
				break;
			default:
				getJoke(message);
				break;
		}

	}
}