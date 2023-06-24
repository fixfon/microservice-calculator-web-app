// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	leftSide: string;
	rightSide: string;
	operator: string;
	result: string;
};

const OperatorServiceMap = {
	'+': 'add',
	'-': 'subtract',
	x: 'multiply',
	'÷': 'divide',
	'%': 'percentage',
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	console.log('hit api request:', req.body);
	const { leftSide, rightSide, operator, result } = JSON.parse(req.body);

	if (!leftSide || !rightSide || !operator) {
		res.status(400);
		return;
	}

	const operatorMap =
		OperatorServiceMap[operator as keyof typeof OperatorServiceMap];
	const daprPort = process.env.DAPR_HTTP_PORT ?? 3500;
	const daprUrl = `http://localhost:${daprPort}/v1.0/invoke/${operatorMap}/method/${operatorMap}`;

	const stateStoreName = `statestore`;
	const stateUrl = `http://localhost:${daprPort}/v1.0/state/${stateStoreName}`;

	const percentageRes = await fetch(daprUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			leftSide,
			rightSide,
			operator,
			result,
		}),
	});

	const percentage = await percentageRes.json();

	console.log('percentage:', percentage);

	const operationResult = {
		...percentage,
	};

	// save or update latest operation of the client on state store
	const clientAddress =
		req.headers['x-forwarded-for'] || req.socket.remoteAddress;

	console.log('stateUrl:', stateUrl);
	await fetch(stateUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify([
			{
				key: clientAddress,
				value: operationResult,
			},
		]),
	}).then((res) => {
		if (!res.ok) {
			console.log('is not ok');
		}

		console.log('is ok');
	});

	// get state from state store
	const stateRes = await fetch(`${stateUrl}/${clientAddress}`);

	// get the state value
	const state = await stateRes.json();
	console.log('state:', state);

	res.status(200).json(operationResult);
}
