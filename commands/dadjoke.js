const fetch = require('node-fetch');
const ActiveStatus = require('../models/ActiveStatus');

module.exports = {
	name: "dadjoke",
	description: "A command for returning a random dad joke from the icanhazdadjokes API.",
	execute(message, args) {

		function getActive(message) {
			ActiveStatus.findByCommandAndGuild(message.guild.id, 'dadjoke')
					.then(status => {
						if (status !== undefined) {
							getJoke();
						}
						else {
							return false;
						}
					})
					.catch(console.error);
		}

        async function getJoke() {
			
			const dadjoke = await fetch("https://icanhazdadjoke.com/", {
				method: "GET",
				headers: { Accept: "application/json" },
				}).then(response => response.json()).catch(console.error);
	
			message.reply(dadjoke.joke).catch(console.error);

        }

		function activate(message) {
			// Just don't do anything if this user is not an administrator on this server
			if(!message.member.permissions.has("ADMINISTRATOR"))  {
				message.reply("Only administrators can activate this feature. Better try next time sucker.");
				return;	
			}

			const status = {
				guildId: message.guild.id,
				command: 'dadjoke'
			}

			ActiveStatus.add(status)
				.then(status => {
					message.reply("`dadjoke` has been activated. Brace yourselves...");
				})
				.catch(error => {
					message.reply("`dadjoke` is already active...");
					console.log(error);
				})

		}

		function deactivate(message) {

			// Just don't do anything if this user is not an administrator on this server
			if(!message.member.permissions.has("ADMINISTRATOR"))  {
				message.reply("Only administrators can deactivate this feature. Better luck next time sucker!");
				return;	
			}

			ActiveStatus.deleteByCommandAndGuild(message.guild.id, 'dadjoke')
				.then(res => {
					// If it has returned a number greater than 0, stuff has been deleted
					if (res !== 0){
						message.reply("`dadjoke` has been deactivated. Sad times!");
					} else {
						message.reply("`dadjoke` isn't active anyway...");
					}
				})
				.catch(err => {
					console.log(err);
				});
		}

		function getStatus(message) {
			ActiveStatus.findByCommandAndGuild(message.guild.id, 'dadjoke')
				.then(status => {
					if (status !== undefined) {
						message.reply("The `dadjoke` command is currently `activated`");
					}
					else {
						message.reply("The `dadjoke` command is currently `deactivated`");
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