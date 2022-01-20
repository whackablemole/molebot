require("dotenv").config();
const server = require('./Structure/api/server');
require('./Discord/client.js');

const port = process.env.PORT || 5000;

server.listen(port, () => {
	console.log(`\n***Server running on ${port}***\n`);
});