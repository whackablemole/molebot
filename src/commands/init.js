const Guild = require('../models/Guild');

module.exports = {
	name: "init",
	description: "Initialise the Guild in MoleBot's database",
	execute(message, args) {

		// Just don't do anything if this user is not an administrator on this server
		if(!message.member.permissions.has("ADMINISTRATOR"))  {
			message.reply("Only administrators can use this command, you naughty little so-and-so.");
			return;	
		}

		const guild = {
			guildId: message.guild.id,
			name: message.guild.name,
			description: message.guild.description,
			ownerId: message.guild.ownerId
		}

		Guild.add(guild)
			.then((guild) => {
				console.log(guild);
				message.channel.send("MoleBot initiated!")
			})
			.catch(console.error);
		
	}
}