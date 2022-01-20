const ActiveStatus = require('../../Models/ActiveStatus');

module.exports = {

	isActive,
	activate,
	deactivate,
	getStatus

}

async function isActive(guildId, command) {
	return await ActiveStatus.findByCommandAndGuild(guildId, command)
			.then(status => {
				if (status !== undefined) {
					return true;
				} else {
					return false;
				}
			})
			.catch(error => {
				console.log(error);
				return false;
			});
}

async function activate(message, command) {
	// Just don't do anything if this user is not an administrator on this server
	if(!message.member.permissions.has("ADMINISTRATOR"))  {
		message.channel.send(`What are you doing?! Only administrators can activate commands!`)
		return;	
	}

	// If it is already active, there isn't any point in activating it a second time
	if((await isActive(message.guild.id, command))) 
	{
		message.reply(`\`${command}\` is already active...`);
		return;
	};

	const status = {
		guildId: message.guild.id,
		command: command
	}

	ActiveStatus.add(status)
		.then(() => {
			message.reply(`\`${command}\` has been activated. Use it wisely!`).catch(console.error);
		})
		.catch(error => {
			console.log(error);
		})

}

function deactivate(message, command) {
	// Just don't do anything if this user is not an administrator on this server
	if(!message.member.permissions.has("ADMINISTRATOR"))  {
		message.reply("Only administrators can deactivate this feature. Better luck next time sucker!");
		return;	
	}

	// If it is already inactive, don't bother trying to deactivate it again
	//if(!isActive(message.guild.id, command)) return;

	ActiveStatus.deleteByCommandAndGuild(message.guild.id, command)
		.then(res => {
			// If it has returned a number greater than 0, stuff has been deleted
			if (res !== 0){
				message.reply(`\`${command}\` has been deactivated. Sad times!`);
			} else {
				message.reply(`\`${command}\` isn't active anyway...`);
			}
		})
		.catch(err => {
			console.log(err);
		});
}

function getStatus(message, command) {
	ActiveStatus.findByCommandAndGuild(message.guild.id, command)
		.then(status => {
			if (status !== undefined) {
				message.reply(`The \`${command}\` command is currently \`activated\``);
			}
			else {
				message.reply(`The \`${command}\` command is currently \`deactivated\``);
			}
		})
		.catch(console.error);
}