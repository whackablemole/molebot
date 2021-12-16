const { MessageEmbed } = require('discord.js');

module.exports = {
	name: "agree",
	description: "When the user agrees with the terms and conditions, they will be given the member role.",
	execute(message, args) {
		// Catch for if the user isn't a new arrival anyway
		if(!message.member.roles.cache.find(role => role.name === "New Arrival") || !message.channel.name.includes('welcome-message')) 
			{
				message.delete()
				return;
			}
		
		const chooseRolesChannel = message.guild.channels.cache.find(ch => ch.name.includes('choose-your-role'));
		const lobbyChannel = message.guild.channels.cache.find(ch => ch.name.includes('lobby'));
		const eventsChannel = message.guild.channels.cache.find(ch => ch.name.includes('upcoming-events'));
		const newArrivalRole = message.guild.roles.cache.find(role => role.name === 'New Arrival');
		const memberRole = message.guild.roles.cache.find(role => role.name === 'Member');
		message.member.roles.remove(newArrivalRole);
		message.member.roles.add(memberRole);
		
		let generalDesc = `Welcome to ${message.guild.name}, <@${message.author.id}>! We are really happy to have you on board!`;
		let chooseRolesDesc = ``;
		if(chooseRolesChannel) chooseRolesDesc = `\n\nDon't forget to choose your role in <#${chooseRolesChannel.id}> to show all the relevant channels.`;
		let eventsDesc = ``;
		if(eventsChannel) eventsDesc = `\n\nA full list of upcoming events can be found in <#${eventsChannel.id}>. Put your name down for any events you want to participate in!`;
		
		const embed = new MessageEmbed()
		.setColor('#02bcef')
		.setAuthor(message.author.username, message.author.avatarURL() || message.author.defaultAvatarURL)
		.setTitle(`${message.guild.name} has a brand new member!`)
		.setDescription(`${generalDesc} ${chooseRolesDesc} ${eventsDesc}`)	

		// Delete every message accept the pinned message from the welcome-message channel
		message.channel.messages.fetch({ limit: 100 })
  								.then(fetched => {
    	const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);

    	message.channel.bulkDelete(notPinned, true);
  })
  .catch(console.error);

  	if(lobbyChannel) {
		  lobbyChannel.send({ embeds: [embed]}).catch(console.error)
		} else {
			console.log(`No welcome channel to send messages to...`);
			message.channel.send("There is no channel inluding the word 'lobby' so I can't send a welcome message. That's rather sad, when you think about it...")
			.then(msg => {
				// Above message will be deleted after 5 seconds
				setTimeout(() => {msg.delete()}, 5000);
			})
			.catch(console.error);
		}
	}
}