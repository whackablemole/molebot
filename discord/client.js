const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });

const prefix = process.env.BOT_PREFIX;

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../commands/${file}`);

	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('MoleBot is online!');
});

client.on('guildMemberAdd', guildMember => {
	let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'New Arrival');

	guildMember.roles.add(welcomeRole);
});

client.on('messageCreate', message => {
	if(!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	const textString = message.content.slice(prefix.length + command.length).trim();
	
	switch (command) {
		case 'init':
			client.commands.get('init').execute(message, args);
			break;
		case 'ping': 
			client.commands.get('ping').execute(message, args);
			break;
		case 'youtube':
			client.commands.get('youtube').execute(message, args);
			break;
		case 'agree':
			client.commands.get('agree').execute(message, args);
			break;
		case 'engineer':
			client.commands.get('engineer').execute(message, textString);
			break;
		case 'rc':
			client.commands.get('rc').execute(message, args);
			break;
		case 'support':
			client.commands.get('support').execute(message, args);
			break;
		case 'dadjoke':
			client.commands.get('dadjoke').execute(message, args);
			break;
		case 'norris':
			client.commands.get('norris').execute(message, args);
			break;
		case 'help':
			client.commands.get('help').execute(message, args);
			break;

	}

});

client.login(process.env.CLIENT_TOKEN);