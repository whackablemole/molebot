const db = require('../Config/dbConfig');

module.exports = {
	add,
	find,
	findByGuild,
	findByCommandAndGuild,
	findByCommandGuildAndChannel,
	deleteByCommandAndGuild,
	deleteSingleRow
}

async function add(status) {
	return await db('channels_whitelist').insert(status, ['id','guildId','command']);
}

function find() {
	return db('channels_whitelist');
}

function findByGuild(guildId) {
	return db('channels_whitelist').where({ guildId });
}

function findByCommandAndGuild(guildId, command) {
	return db('channels_whitelist')
			.where({ guildId, command });
}

function findByCommandGuildAndChannel(guildId, command, channelId) {
	return db('channels_whitelist')
			.where({ guildId, command, channelId })
			.first();
}

function deleteByCommandAndGuild(guildId, command) {
	return db('channels_whitelist')
			.where({ guildId, command })
			.del();
}

function deleteSingleRow(guildId, command, channelId) {
	return db('channels_whitelist')
		.where({ guildId, command, channelId })
		.del();
}