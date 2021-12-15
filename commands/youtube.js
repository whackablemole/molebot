module.exports = {
	name: "youtube",
	description: "Shows a link to Mole's YouTube channel!",
	execute(message, args) {

		let role = message.guild.roles.cache.find(r => r.name === "Member");

		if(message.member.roles.cache.some(r => r.name === "Member")){
			message.reply('https://www.youtube.com/channel/UC0p-qKiF-YrWu6spnTz1khg');
		} else {
			message.channel.send("I see you don't have the 'Member' role, let me change that!");
			message.member.roles.add(role).catch(console.error);
		}

	}
}