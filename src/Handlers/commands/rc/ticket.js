const { Collector } = require('discord.js');
const cw = require('../../helpers/channelWhitelist');

module.exports = {
	create,
}

async function create(message, channelName) {
	const so = message.guild.channels.cache.find(channel => channel.name === "stewards-office");
	const rcr = message.guild.roles.cache.find(role => role.name === "Race Control (RC)");
	
	// Return a message if there is no "stewards-office" channel
	if (!so) {
		message.channel.send("The stewards-office channel cannot be found.");
		return;
	}

	const ir = so.parentId;
	const channel = await message.guild.channels.create(`report: ${message.author.username + "-" + channelName}`);
	channel.setParent(ir);

	channel.permissionOverwrites.create(message.guild.id, {
		SEND_MESSAGES: false,
		VIEW_CHANNEL: false,
		ADD_REACTIONS: false,
	});
	channel.permissionOverwrites.create(message.author, {
		SEND_MESSAGES: true,
		VIEW_CHANNEL: true,
		ADD_REACTIONS: false,
	});
	channel.permissionOverwrites.create(rcr, {
		SEND_MESSAGES: true,
		VIEW_CHANNEL: true,
		ADD_REACTIONS: false
	})

	const reactionMessage = await channel.send(`Thank you for contacting the Steward's office. The details are:\n\n${channelName.split("-").join(" ")}`);

	try {
		await reactionMessage.react("🔒");
		await reactionMessage.react("⛔");
	} catch(err){
		channel.send('Error sending emojis!');
		console.log(err);
		return;
	}

	const collector = reactionMessage.createReactionCollector(
		(reaction, user) => !user.bot,
		{ dispose: true }
	);

	collector.on('collect', (reaction, user) => {
		if (user.bot) {
			console.log("User is a bot, ignoring inputs");
			return;
		}

		// Don't process any of these rules if the user isn't an administrator
		if (!message.guild.members.cache.find(member => member.id === user.id).permissions.has("ADMINISTRATOR")) {
			console.log("user isn't an admin");
			return;
		}
		switch (reaction.emoji.name) {
			case "🔒":
				channel.permissionOverwrites.edit(message.author, {
					SEND_MESSAGES: false
				});
				break;
			case "⛔":
				channel.send('This channel will be deleted in five seconds.');
				try {setTimeout(() => channel.delete(), 5000);}
				catch(error) {console.log(error); return;}
				break;
			default:
				console.log(reaction.emoji.name);
				break;
		}
	});

	message.channel.send(`Race Control will contact you shortly in ${channel}`)
		.then(msg => {
			setTimeout(() => msg.delete(), 7000);
			setTimeout(() => message.delete(), 3000);
		})
		.catch(error => console.error);

	//🔒 - ticket locked
	//⛔ - delete ticket
}