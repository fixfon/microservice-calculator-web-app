const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/percentage', (req, res) => {
	//calculate percentage
	const operation = req.body;

	if (operation.rightSide === '100') {
		const result = Number(operation.leftSide) * 0.01;

		operation.result = result.toString();
	} else {
		const result =
			(Number(operation.leftSide) * Number(operation.rightSide)) / 100;

		operation.result = result.toString();
	}
	console.log(operation);

	res.json(operation);
});

app.listen(3001, () => {
	console.log('Percentage service listening on port 3001!');
});
