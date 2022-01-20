const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS"] });

const prefix = process.env.BOT_PREFIX;

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/Handlers/commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../Handlers/commands/${file}`);

	client.commands.set(command.name, command);
}

require('../Handlers/listeners/onceReady')(client);
require('../Handlers/listeners/onMessageCreate')(client, prefix);
require('../Handlers/listeners/onGuildMemberAdd')(client)


client.login(process.env.CLIENT_TOKEN);