
exports.up = function(knex) {
	// Create the guilds table
  return knex.schema.createTable('guilds', (table) => {
	  table.string('guildId').notNullable().index().unique();
	  table.string('name').notNullable();
	  table.text('description', 1064);
	  table.string('ownerId').notNullable();
	  table.timestamps(true, true);
  })
  // Now create the users table
  .createTable('guilds_users', (table) => {
	  table.increments(); // Create id column
	  table.string('userId').notNullable().index();
	  table.string('guildId').notNullable().references('guildId').inTable('guilds').onDelete('CASCADE').onUpdate('CASCADE');
	  table.string('name').notNullable();
	  table.timestamps(true, true);
	  table.unique(['guildId', 'userId']);
  })
  .createTable('modules', (table) => {
	table.string('command').notNullable().index().unique().primary();
	table.string('description', 500).notNullable();
	table.integer('useCounter').unsigned();
	table.timestamps(true, true);
  })
  // Create a table that tracks when a guild has disabled a module
  .createTable('modules_active', (table) => {
	  table.increments() // Create id column
	  table.string('command').notNullable().references('command').inTable('modules').onDelete('CASCADE').onUpdate('CASCADE');
	  table.string('guildId').notNullable().references('guildId').inTable('guilds').onDelete('CASCADE').onUpdate('CASCADE');
	  table.timestamps(true, true);
	  table.unique(['guildId', 'command']);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('guilds_users').dropTableIfExists('modules_active').dropTableIfExists('modules').dropTableIfExists('guilds');
};
