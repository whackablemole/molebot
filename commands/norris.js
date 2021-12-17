
const fetch = require('node-fetch');

module.exports = {
	name: "norris",
	description: "A command for returning a random Chuck Norris joke from chucknorris.io",
	async execute(message) {

		const norris = await fetch("https://api.chucknorris.io/jokes/random", {
            method: "GET",
            headers: { Accept: "application/json" },
          }).then(response => response.json()).catch(console.error);

          message.reply(norris.value).catch(console.error);
	}
}