const ChannelWhitelist = require('../../Models/ChannelWhitelist');

module.exports = {

	addChannel,
	isWhitelisted,
	removeAll,
	removeChannel,
}

async function addChannel(message, command) {
	// Just don't do anything if this user is not an administrator on this server
	if (!message.member.permissions.has("ADMINISTRATOR")) {
		message.channel.send(`Nope! Only administrators can add channels to the whitelist!`)
		return;
	}

	// If the user hasn't mentioned any channels, alert them to that fact first
	if (!message.mentions.channels.first()) {
		message.channel.send("Whoops, looks like you haven't mentioned a valid channel");
		return;
	}

	const channelId = message.mentions.channels.first().id;

	// If it is already whitelisted, there isn't any point adding it again
	if ((await isWhitelisted(message.guild.id, command, channelId, true))) {
		message.channel.send(`\`${command}\` is already whitelisted in <#${channelId}>...`);
		return;
	};

	const whitelist = {
		guildId: message.guild.id,
		channelId,
		command
	}

	ChannelWhitelist.add(whitelist)
		.then(() => {
			message.channel.send(`\`${command}\` can now be used in the <#${channelId}> channel. Enjoy!`);
		})
		.catch(error => {
			if (error.errno === 19) {
				message.channel.send(`\`${command}\` is already whitelisted in the <#${channelId}> channel.`);
			} else {
				console.log(error);
			}
		});
}

async function removeChannel(message, command) {
	// Just don't do anything if this user is not an administrator on this server
	if (!message.member.permissions.has("ADMINISTRATOR")) {
		message.channel.send(`Nope! Only administrators can add channels to the whitelist!`)
		return;
	}

	// If the user hasn't mentioned any channels, alert them to that fact first
	if (!message.mentions.channels.first()) {
		message.channel.send("Whoops, looks like you haven't mentioned a valid channel");
		return;
	}

	const channelId = message.mentions.channels.first().id;

	// If it is already whitelisted, there isn't any point adding it again
	if (!(await isWhitelisted(message.guild.id, command, channelId, true))) {
		message.channel.send(`\`${command}\` is not whitelisted in <#${channelId}> anyway...`);
		return;
	};

	// Remove the channel from the whitelist then
	ChannelWhitelist.deleteSingleRow(message.guild.id, command, channelId).then(() => {
		message.channel.send(`\`${command}\` can no longer be used in the <#${channelId}> channel!`);
	})
		.catch(error => console.error);
}

async function removeAll(message, command) {
	ChannelWhitelist.deleteByCommandAndGuild(message.guild.id, command)
		.then(() => {
			message.channel.send(`All channels have been removed from the whitelist for \`${command}\``);
		})
		.catch(error => {
			console.log(error);
			message.channel.send(`Unable to remove channels from the whitelist for \`${command}\``);
		});
}

// Set isSpecific to false if you would like the command to be used freely if there is nothing in the whitelist
async function isWhitelisted(guildId, command, channelId, isSpecific = true) {
	return await ChannelWhitelist.findByCommandAndGuild(guildId, command)
		.then(channels => {
			if (channels !== undefined) {
				const channel = channels.filter(channel => channel.channelId === channelId);
				if ((channels.length === 0 && !isSpecific) || (channel[0])) {
					return true;
				} else {
					return false;
				}
			} else {
				return true;
			}
		})
		.catch(error => {
			console.log(error);
			return false;
		});
}


