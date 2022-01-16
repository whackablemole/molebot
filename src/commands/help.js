module.exports = {
	name: "help",
	description: "Molebot's help command.",
	execute(message) {

		message.reply("MoleBot obeys the following commands:\n`$dadjoke` - receive a random dad joke from the icanhazdadjoke API\n`$norris` - receive a random Chuck Norris _fact_\n`$engineer` - ask the engineer for setup tips for ACC. Use `$engineer help` for further info. Only works in the engineer's own channel.\n`support` - Join the community support team to offer help to other members. Other members can tag this role using the `community support` role");
		
	}
}