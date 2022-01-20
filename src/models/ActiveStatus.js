const db = require('../Config/dbConfig');

module.exports = {
	add,
	find,
	findByGuild,
	findByCommandAndGuild,
	deleteByCommandAndGuild
}

async function add(status) {
	return await db('modules_active').insert(status, ['id','guildId','command']);
}

function find() {
	return db('modules_active');
}

function findByGuild(guildId) {
	return db('modules_active').where({ guildId });
}

function findByCommandAndGuild(guildId, command) {
	return db('modules_active')
			.where({ guildId, command })
			.first();
}

function deleteByCommandAndGuild(guildId, command) {
	return db('modules_active')
			.where({ guildId, command })
			.del();
}