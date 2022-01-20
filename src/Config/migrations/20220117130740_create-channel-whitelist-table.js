
exports.up = function(knex) {
	return knex.schema.createTable('channels_whitelist', (table) => {
		table.string('guildId').notNullable().references('guildId').inTable('guilds').onDelete('CASCADE').onUpdate('CASCADE');
		table.string('command').notNullable().references('command').inTable('modules').onDelete('CASCADE').onUpdate('CASCADE');
		table.string('channelId').notNullable();
		table.timestamps(true, true);
		// Only allow it to be inserted if it isn't already whitelisted for the same command in this guild
		table.unique(['guildId','command','channelId']); 
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('channels_whitelist');
};
