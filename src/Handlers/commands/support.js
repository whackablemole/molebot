const ActiveStatus = require('../../Models/ActiveStatus');
const active = require('../helpers/activeStatus');

module.exports = {
	name: "support",
	description: "The commands for adding/removing yourself from the community support team",
	execute(message, args) {

		const { activate, deactivate, getStatus, isActive } = active;

        const supportRole = message.guild.roles.cache.find(role => role.name === 'Support Staff');

        async function joinSupport(msg) {
            if(!(await isActive(message.guild.id, 'support'))) return;
            msg.member.roles.add(supportRole);
        }

        async function leaveSupport(msg) {
            if(!(await isActive(message.guild.id, 'support'))) return;
            msg.member.roles.remove(supportRole);
        }

        async function help(msg) {
            if(!(await isActive(message.guild.id, 'support'))) return;
            msg.channel.send("Use `$support join` to join the Support Staff, or `$support leave` in order to leave the Support Staff. To deactivate the support system, simply delete the Support Staff role.").catch(console.error);
        }
        
        switch (args[0]) {
            case "activate":
            activate(message, 'support');
			break;
			case "deactivate":
			deactivate(message, 'support');
            case "join":
            joinSupport(message);
            break;
            case "leave":
            leaveSupport(message);
            break;
			case "status":
			getStatus(message, 'support');
			break;
            case "help":
            help(message);
            break;
        }
	}
}