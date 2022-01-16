const { MessageMentions: { USERS_PATTERN } } = require('discord.js');

module.exports = {
	name: "rc",
	description: "This is the race control command, used for managing incidents during an online racing season",
	execute(message, args) {
		//console.log("Executing the race control command");

		const rc = message.guild.roles.cache.find(role => (role.name === `Race Control (RC)`));
		function activate() {

			//Check to see if there is already a role called Race Control (RC)
			if (rc) {
				message.channel.send("The Race Control feature has already been activated. If this is unintentional, delete the `Race Control` role, the `stewards-office` channel and the `Incident Reporting` category and then run this command again.");
				return;
			}; //It already exists

			//Create the role if it doesn't exist
			if (!rc) {
				message.guild.roles.create({
					name: 'Race Control (RC)',
					color: '#24b7ad',
					mentionable: true,
					reason: "Race Control are needed to adjudicate racing incidents"
				})
			}

			// Create a category called incident reporting with an incident reporting text channel inside
			message.guild.channels.create('Incident Reporting', {
				type: 'GUILD_CATEGORY',
				permissionOverwrites: [
					{
						id: message.guild.id,
						allow: ['VIEW_CHANNEL'],
					}
				]
			}).then(cat => {
				message.guild.channels.create('stewards-office', {
					type: 'GUILD_TEXT',
					parent: cat.id,
					permissionOverwrites: [
						{
							id: message.guild.id,
							allow: ['VIEW_CHANNEL']
						}]
				});
			}).catch(console.error);

			message.delete();
		}

		async function addMember(id) {
			if (!message.member.permissions.has("ADMINISTRATOR")) return;
			const member = message.mentions.members.first();
			member.roles.add(rc).catch();
			message.delete();
		}

		//Command handler
		switch (args[0]) {
			case "activate":
				activate();
				break;
			case "addmember":
				addMember(args[1]);
				break;
				
		}

	}

}