// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	leftSide: string;
	rightSide: string;
	operator: string;
	result: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	console.log('api request:', req.body);
	const { leftSide, rightSide, operator, result } = JSON.parse(req.body);

	const percentageRes = await fetch('http://localhost:3001/percentage', {
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
	res.status(200).json(operationResult);
}
