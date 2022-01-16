const { MessageEmbed } = require('discord.js');
const ActiveStatus = require('../models/ActiveStatus');

module.exports = {
	name: "engineer",
	description: "The race engineer command",
	execute(message, arg) {

		const engineer = require("./engineer.json");
		const { deactivate, getStatus, activate } = require('../helpers/active');
		const args = arg.split(" ");

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

		function doEngineer(message) {
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

		switch (args[0]) {
			case 'activate':
				activate(message, 'engineer');
				break;
			case 'deactivate':
				deactivate(message, 'engineer');
				break;
			case 'status':
				getStatus(message, 'engineer');
				break;
			default:
				doEngineer(message);
				break;
		}


	}
}