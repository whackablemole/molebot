module.exports = {
	name: "support",
	description: "The commands for adding/removing yourself from the community support team",
	execute(message, args) {
        const supportRole = message.guild.roles.cache.find(role => role.name === 'Support Staff');
        
        // If the Support Staff role doesn't exist on this server, just stop
		if(!supportRole) {console.log("Support command not active on this server"); return;};

        function joinSupport(msg) {
            msg.member.roles.add(supportRole);
        }

        function leaveSupport(msg) {
            msg.member.roles.remove(supportRole);
        }

        function help(msg) {
            msg.channel.send("Use `$support join` to join the Support Staff, or `$support leave` in order to leave the Support Staff.").catch(console.error);
        }
        
        switch (args[0]) {
            case "join":
            joinSupport(message);
            break;
            case "leave":
            leaveSupport(message);
            break;
            case "help":
            help(message);
            break;
        }

        message.delete();
	}
}