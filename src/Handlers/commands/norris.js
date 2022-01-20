
const fetch = require('node-fetch');
const ActiveStatus = require('../../Models/ActiveStatus');
const active = require('../helpers/activeStatus');

module.exports = {
	name: "norris",
	description: "A command for returning a random Chuck Norris joke from chucknorris.io",
	execute(message, args) {

		const { activate, deactivate, getStatus, isActive } = active;

		async function getNorris() {
			// Don't go any further if this is inactive
			if (!(await isActive(message.guild.id, 'norris'))) return;

			const norris = await fetch("https://api.chucknorris.io/jokes/random", {
				method: "GET",
				headers: { Accept: "application/json" },
			  }).then(response => response.json()).catch(console.error);
	
			  message.reply(norris.value).catch(console.error);
		}

		switch (args[0]) {
			case 'activate':
				activate(message, 'norris');
				break;
			case 'deactivate':
				deactivate(message, 'norris');
				break;
			case 'status':
				getStatus(message, 'norris');
				break;
			default:
				getNorris(message);
				break;
		}

	}
}