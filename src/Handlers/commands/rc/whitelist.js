const cw = require('../../helpers/channelWhitelist');

module.exports = {
	addChannel (message){
		cw.addChannel(message, 'rc');
	},

	removeChannel (message){
		cw.removeChannel(message, 'rc');
	},
}