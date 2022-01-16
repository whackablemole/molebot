const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });

const prefix = process.env.BOT_PREFIX;

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`../commands/${file}`);

	client.commands.set(command.name, command);
}

require('../Listeners/onceReady')(client);
require('../Listeners/onMessageCreate')(client, prefix);
require('../Listeners/onGuildMemberAdd')(client)


client.login(process.env.CLIENT_TOKEN);