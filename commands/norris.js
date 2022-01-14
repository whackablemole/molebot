
const fetch = require('node-fetch');
const ActiveStatus = require('../models/ActiveStatus');

module.exports = {
	name: "norris",
	description: "A command for returning a random Chuck Norris joke from chucknorris.io",
	execute(message, args) {

		function getActive(message) {
			ActiveStatus.findByCommandAndGuild(message.guild.id, 'norris')
					.then(status => {
						if (status !== undefined) {
							getNorris();
						}
						else {
							return false;
						}
					})
					.catch(console.error);
		}

		async function getNorris() {
			const norris = await fetch("https://api.chucknorris.io/jokes/random", {
				method: "GET",
				headers: { Accept: "application/json" },
			  }).then(response => response.json()).catch(console.error);
	
			  message.reply(norris.value).catch(console.error);
		}

		function activate(message) {
			// Just don't do anything if this user is not an administrator on this server
			if(!message.member.permissions.has("ADMINISTRATOR"))  {
				message.reply("Only administrators can activate this feature. Better try next time sucker.");
				return;	
			}

			const status = {
				guildId: message.guild.id,
				command: 'norris'
			}

			ActiveStatus.add(status)
				.then(status => {
					message.reply("`norris` has been activated. Brace yourselves...");
				})
				.catch(error => {
					if (error.errno === 19) {
						console.log(error);
						message.reply("`norris` is already active...");
					} else {
						console.log(error);
					}
				})

		}

		function deactivate(message) {

			// Just don't do anything if this user is not an administrator on this server
			if(!message.member.permissions.has("ADMINISTRATOR"))  {
				message.reply("Only administrators can deactivate this feature. Better luck next time sucker!");
				return;	
			}

			ActiveStatus.deleteByCommandAndGuild(message.guild.id, 'norris')
				.then(res => {
					// If it has returned a number greater than 0, stuff has been deleted
					if (res !== 0){
						message.reply("`norris` has been deactivated. Sad times!");
					} else {
						message.reply("`norris` isn't active anyway...");
					}
				})
				.catch(console.error);
		}

		function getStatus(message) {
			ActiveStatus.findByCommandAndGuild(message.guild.id, 'norris')
				.then(status => {
					if (status !== undefined) {
						message.reply("The `norris` command is currently `activated`");
					}
					else {
						message.reply("The `norris` command is currently `deactivated`");
					}
				})
				.catch(console.error);
		}

		switch (args[0]) {
			case 'activate':
				activate(message);
				break;
			case 'deactivate':
				deactivate(message);
				break;
			case 'status':
				getStatus(message);
				break;
			default:
				getActive(message);
				break;
		}

	}
}