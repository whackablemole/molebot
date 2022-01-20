
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('modules').del()
    .then(function () {
      // Inserts seed entries
      return knex('modules').insert([
        {command: 'dadjoke', description: 'Returns a dad joke from the ICanHazDadJoke API.', useCounter: 0},
        {command: 'engineer', description: 'A race engineer that returns setup hints on request', useCounter: 0},
		{command: 'support', description: 'Join or leave the community support team', useCounter: 0},
		{command: 'norris', description: 'Returns a Chuck Norris fact from the Chuck Norris API.', useCounter: 0},
		{command: 'ping', description: 'A simple test of the API', useCounter: 0},
		{command: 'youtube', description: "A shameless plug for Whackablemole's YouTube channel.", useCounter: 0},
		{command: "rc", description: "Allows members to log incidents after a race, for the Race Control staff to consider actions.", useCounter: 0}
      ]);
    });
};
