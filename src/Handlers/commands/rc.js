const { MessageMentions: { USERS_PATTERN } } = require('discord.js');
const active = require('../helpers/activeStatus');
const cw = require("../helpers/channelWhitelist");

// rc modules
const whitelist = require('./rc/whitelist');
const ticket = require('./rc/ticket');

module.exports = {
	name: "rc",
	description: "This is the race control command, used for managing incidents during an online racing season",
	execute(message, args) {
		//console.log("Executing the race control command");

		const rc = message.guild.roles.cache.find(role => (role.name === `Race Control (RC)`));
		const so = message.guild.channels.cache.find(channel => (channel.name === "stewards-office"));
		async function activate() {

			if (await active.isActive(message.guild.id, 'rc')) {
				console.log("RC is already active. Terminating.");
			}

			//Create the role if it doesn't exist
			if (!rc) {
				console.log("Creating Race Control role")
				message.guild.roles.create({
					name: 'Race Control (RC)',
					color: '#24b7ad',
					mentionable: true,
					reason: "Race Control are needed to adjudicate racing incidents"
				})
			}

			// Create a category called incident reporting with an incident reporting text channel inside
			if (!so) {
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
			}

			// Then just use the normal activation helper
			active.activate(message, 'rc');
		}

		async function addMember(message) {
			if (!(await active.isActive(message.guild.id, 'rc'))) return
			if (!message.member.permissions.has("ADMINISTRATOR")) return;
			const member = message.mentions.members.first();
			member.roles.add(rc).catch(console.error);
		}

		async function removeMember(message) {
			if (!(await active.isActive(message.guild.id, 'rc'))) return
			if (!message.member.permissions.has("ADMINISTRATOR")) return;
			const member = message.mentions.members.first();
			member.roles.remove(rc).catch(console.error);
		}

		async function whitelistHandler(message, args) {
			switch (args[1]) {
				case "add":
					whitelist.addChannel(message,args);
					break;
				case "remove":
					whitelist.removeChannel(message, args);
					break;
				case "removeall":
					cw.removeAll(message, 'rc');
					break;
			}
		}

		async function ticketHandler(message, args) {
			switch (args[1]) {
				case "create":
					ticket.create(message, args.slice(2).join("-"))
					break;
			}
		}

		//Command handler
		switch (args[0]) {
			case "activate":
				activate();
				break;
			case "deactivate":
				active.deactivate(message, 'rc');
				break;
			case "status":
				active.getStatus(message, 'rc');
				break;
			case "removemember":
				removeMember(message);
				break;
			case "whitelist":
				whitelistHandler(message, args);
				break;
			case "addmember":
				addMember(message);
				break;
			case "ticket":
				ticketHandler(message, args);
				break;

		}

	}

}