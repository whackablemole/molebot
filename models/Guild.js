const db = require('../dbConfig');

module.exports = {
	add,
	find,
	findById,
	remove,
	update
}

async function add(guild) {
	return await db('guilds').insert(guild, ['guildId','name']);
}

function find() {
	return db('guilds');
}

function findById(guildId) {
	return db('guilds')
			.where({ guildId })
			.first();
}

function remove(guildId) {
	return db('guilds')
			.where({ guildId })
			.del();
}

function update(guildId, changes) {
	return db('guilds')
			.where({ guildId })
			.update(changes)
			.then(() => {
				return findById(guildId);
			})
}