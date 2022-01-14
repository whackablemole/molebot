const { MessageEmbed } = require('discord.js');
const ActiveStatus = require('../models/ActiveStatus');

module.exports = {
	name: "engineer",
	description: "The race engineer command",
	execute(message, arg) {

		const args = arg.split(" ");

		const engineer = require("./engineer.json");

		function activate(message) {
			// Just don't do anything if this user is not an administrator on this server
			if(!message.member.permissions.has("ADMINISTRATOR"))  {
				message.reply("Only administrators can activate this feature. Better try next time sucker.");
				return;	
			}

			const status = {
				guildId: message.guild.id,
				command: 'engineer'
			}

			ActiveStatus.add(status)
				.then(status => {
					message.reply("`engineer` has been activated. Brace yourselves...");
				})
				.catch(error => {
					if (error.errno === 19) {
						console.log(error);
						message.reply("`engineer` is already active...");
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

			ActiveStatus.deleteByCommandAndGuild(message.guild.id, 'engineer')
				.then(res => {
					// If it has returned a number greater than 0, stuff has been deleted
					if (res !== 0){
						message.reply("`engineer` has been deactivated. Sad times!");
					} else {
						message.reply("`engineer` isn't active anyway...");
					}
				})
				.catch(err => {
					console.log(err);
				});
		}

		function getActive(message) {
			// Just don't do anything if this user is not an administrator on this server
			if(!message.member.permissions.has("ADMINISTRATOR"))  {
				message.reply("Only administrators can activate this feature. Better try next time sucker.");
				return;	
			}

			ActiveStatus.findByCommandAndGuild(message.guild.id, 'engineer')
					.then(status => {
						if (status !== undefined) {
							prepareMessage(message);
						}
						else {
							return false;
						}
					})
					.catch(console.error);
		}

		function createAdviceEmbed(text) {
			let adviceText = engineer[text];
			if (!engineer[text]) return;

			const embed = new MessageEmbed()
				.setColor('#db1c1c')
				//.setAuthor(message.author.username, message.author.avatarURL() || message.author.defaultAvatarURL)
				.setTitle(`Setup advice: ${text}`)
				.setDescription(adviceText);

			message.channel.send({ embeds: [embed] }).catch(console.error);
		}

		function engineer(message) {
			if (message.channel.name !== "acc-race-engineer") {
				const raceEngChnl = message.guild.channels.cache.find(ch => ch.name.includes('acc-race-engineer'))
				let raceEngText = ``;
				if (raceEngChnl) raceEngText = `You must use the <#${raceEngChnl.id}> channel for all race engineer requests.`;
				message.delete();
				message.channel.send(`Sorry, that command can't be used here. ${raceEngText}`)
					.then(msg => {
						setTimeout(() => { msg.delete() }, 10000);
					});
				return;
			}
			if (arg.length === 0) {
				message.reply("Whoops, looks like you haven't told the engineer what issue you want to fix...");
			} else {

				let adviceText = ``;

				createAdviceEmbed(arg);
			}
		}

		function getStatus(message) {
			ActiveStatus.findByCommandAndGuild(message.guild.id, 'engineer')
				.then(status => {
					if (status !== undefined) {
						message.reply("The `engineer` command is currently `activated`");
					}
					else {
						message.reply("The `engineer` command is currently `deactivated`");
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
				engineer(message);
				break;
		}


	}
}