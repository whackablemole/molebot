module.exports = {
	name: "support",
	description: "The commands for adding/removing yourself from the community support team",
	execute(message, args) {
        const supportRole = message.guild.roles.cache.find(role => role.name === 'Support Staff');
        
        

        function activateSupport(msg){
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
        }

        function isActive() {
		    return !(!supportRole); 
        }

        function joinSupport(msg) {
            if(!isActive()) return;
            msg.member.roles.add(supportRole);
        }

        function leaveSupport(msg) {
            if(!isActive()) return;
            msg.member.roles.remove(supportRole);
        }

        function help(msg) {
            if(!isActive()) return;
            msg.channel.send("Use `$support join` to join the Support Staff, or `$support leave` in order to leave the Support Staff. To deactivate the support system, simply delete the Support Staff role.").catch(console.error);
        }
        
        switch (args[0]) {
            case "activate":
            activateSupport(message);
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