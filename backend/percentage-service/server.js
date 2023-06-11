const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.APP_PORT ?? 3001;

app.use(cors());
app.use(express.json());

app.post('/percentage', (req, res) => {
	//calculate percentage
	// console.log('hit percentage service', req);
	const operation = req.body;

	if (operation.rightSide === '100') {
		const result = Number(operation.leftSide) * 0.01;

		operation.result = result.toString();
	} else {
		const result =
			(Number(operation.leftSide) * Number(operation.rightSide)) / 100;

		operation.result = result.toString();
	}

	res.json(operation);
});

app.listen(port, () => {
	console.log(`Percentage service listening on port ${port}`);
});
