const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/percentage', (req, res) => {
	const { percentage } = req.body;
	//calculate percentage
	const result = percentage * 0.01;
	res.json({ result });
});

app.listen(3001, () => {
	console.log('Percentage service listening on port 3001!');
});
