module.exports = {
	name: "ping",
	description: "This is a ping command!",
	execute(message, args) {
		message.reply('pong!');
		console.log("Ping message sent");
	}
}