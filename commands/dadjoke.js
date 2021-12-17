const fetch = require('node-fetch');

module.exports = {
	name: "dadjoke",
	description: "A command for returning a random dad joke from the icanhazdadjokes API.",
	execute(message) {

        async function getJoke() {
			const dadjoke = await fetch("https://icanhazdadjoke.com/", {
				method: "GET",
				headers: { Accept: "application/json" },
			  }).then(response => response.json()).catch(console.error);
	
			message.reply(dadjoke.joke).catch(console.error);
        }

		getJoke();

	}
}