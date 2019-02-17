const express = require('express');

const app = express();

const userRepository = require('./userRepository');

app.get('/', (req, res) => {
	res.send(process.env.TEST);
});

app.get('/users', async (req, res) => {
	const { Items: users } = await userRepository.listUsers();
	res.send(JSON.stringify(users));
});

app.listen(8080, () => {
	console.log('Listening on port 8080');

});