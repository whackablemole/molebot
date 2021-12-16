module.exports = {
	name: "createsupport",
	description: "This command creates a support role for the server to use, as long as it doesn't exist already that is.",
	execute(message) {

		// Check to make sure the current user is an admin user. Only admin users can use this command
		if (!message.member.permissions.has("ADMINISTRATOR")) {
			message.channel.send(`What are you doing?! Only administrators can use that command!`)
							.then(msg => { 
								setTimeout(() => {msg.delete()}, 10000);
							});
			return;
		}
		
		// Check to make sure the support role doesn't already exist
		if (!message.guild.roles.cache.find(role => role.name === "Support Staff")) {
			message.guild.roles.create({
				name: 'Support Staff',
				color: '#db2edb',
				mentionable: true,
				reason: "Support staff are needed to help our guests"
			});
		};

		// Delete the original message from the channel
		message.delete();
	}
}