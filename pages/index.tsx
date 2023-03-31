import Head from 'next/head';
import { Work_Sans } from 'next/font/google';
import ThemeChange from '@/components/ThemeChange';
import UnionIcon from '@/components/UnionIcon';
import BackIcon from '@/components/BackIcon';
import { useState, useEffect } from 'react';

const work_sans = Work_Sans({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
});

const Operator = ['÷', 'x', '-', '+', '%', '='];
const Functional = ['.', 'C', '±', '←'];
const Numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

type Operation = {
	leftSide: string;
	rightSide: string;
	operator: string;
	result: string;
};


export default function Home() {
	const [submitted, setSubmitted] = useState(false);
	const [displayCurrent, setDisplayCurrent] = useState('');
	const [displayPrev, setDisplayPrev] = useState('');
	const [operation, setOperation] = useState<Operation>({
		leftSide: '',
		rightSide: '',
		operator: '',
		result: '',
	});

	const submitOperation = async () => {
		const res = await fetch('/api/calculate', {
			method: 'POST',
			body: JSON.stringify(operation),
		});
		const data = await res.json();
	};

	const handleBeautifyDisplay = () => {
		if (operation.leftSide === '' && operation.rightSide === '') {
			setDisplayCurrent('');
			return;
		}

		if (operation.operator !== '') {
			setDisplayCurrent(Number(operation.rightSide).toLocaleString('en-US'));
			if (!submitted) {
				setDisplayPrev(
					Number(operation.leftSide).toLocaleString('en-US') +
						operation.operator
				);
			}
			if (operation.rightSide.endsWith('.')) {
				setDisplayCurrent(
					Number(operation.rightSide).toLocaleString('en-US') + '.'
				);
			}
		} else {
			if (operation.leftSide.endsWith('.')) {
				setDisplayCurrent(
					Number(operation.leftSide).toLocaleString('en-US') + '.'
				);
			} else {
				setDisplayCurrent(Number(operation.leftSide).toLocaleString('en-US'));
			}
		}
	};

	const handleOperationUpdate = (input: string) => {
		setOperation((prev) => {
			if (prev?.operator) {
				return {
					...prev,
					rightSide: prev.rightSide + input,
				};
			} else {
				if (Operator.includes(input)) {
					return {
						...prev,
						operator: input,
					};
				}
				return {
					leftSide: prev.leftSide + input,
					rightSide: '',
					operator: '',
					result: '',
				};
			}
		});
	};

	const handleFunctionalInput = (input: string) => {
		if (input === 'C') {
			setDisplayCurrent('');
			setDisplayPrev('');
			setOperation({
				leftSide: '',
				rightSide: '',
				operator: '',
				result: '',
			});
		} else if (input === '←') {
			setOperation((prev) => {
				if (prev.operator) {
					return {
						...prev,
						rightSide: prev.rightSide.slice(
							0,
							prev.rightSide.toString().length - 1
						),
					};
				} else {
					return {
						...prev,
						leftSide: prev.leftSide.slice(
							0,
							prev.leftSide.toString().length - 1
						),
					};
				}
			});
		} else if (input === '±') {
			setOperation((prev) => {
				if (prev.operator) {
					return {
						...prev,
						rightSide: (parseFloat(prev.rightSide) * -1).toString(),
					};
				} else {
					return {
						...prev,
						leftSide: (parseFloat(prev.leftSide) * -1).toString(),
					};
				}
			});
		} else if (input === '.') {
			setOperation((prev) => {
				if (prev.operator) {
					return {
						...prev,
						rightSide: prev.rightSide + '.',
					};
				} else {
					return {
						...prev,
						leftSide: prev.leftSide + '.',
					};
				}
			});
		}
	};

	const handleOperationalInput = (input: string) => {
		if (operation.rightSide !== '' && input !== '=') {
			// first do the request to the server and then update the left side with the result operator with the input and right side with empty string
		} else if (operation.rightSide === '' && input === '=') {
			return;
		} else if (operation.rightSide !== '' && input === '=') {
			// submit the request
		} else {
			handleOperationUpdate(input);
		}
	};

	const handleNumberInput = (input: string) => {
		if (input === '0' && displayCurrent === '') return;

		handleOperationUpdate(input);
	};

	const checkInput = (input: string) => {
		console.log(input);
		if (Operator.includes(input)) {
			handleOperationalInput(input);
		} else if (Functional.includes(input)) {
			handleFunctionalInput(input);
		} else if (Numbers.includes(input)) {
			if (
				Number(operation.leftSide).toString().length > 7 ||
				Number(operation.rightSide).toString().length > 7
			)
				return;
			handleNumberInput(input);
		}
	};

	useEffect(() => {
		console.log(operation);
		handleBeautifyDisplay();
	}, [operation]);

	return (
		<>
			<Head>
				<title>Calculator</title>
				<meta name='description' content='Microservice Based Calculator App' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={work_sans.className}>
				<div className='transition-all text-3xl dark:bg-dark-bg bg-light-bg flex justify-center items-center h-screen w-full font-normal'>
					<div className='md:h-[836px] h-[764px] md:w-96 w-72 border-2 rounded-md border-stone-300 flex justify-around items-center flex-col px-4 first:pt-8'>
						<ThemeChange />
						<div className='w-full h-2/6 flex flex-col items-end justify-center gap-16'>
							<div className='dark:text-white/40 text-black/40 w-full font-light text-right'>
								{displayPrev ? displayPrev : '0'}
							</div>
							<div className='w-full text-right text-6xl'>
								{displayCurrent ? displayCurrent : '0'}
								{data ? data : ''}
							</div>
						</div>
						<div className='grid grid-cols-4 w-full place-items-center h-3/5'>
							<button
								onClick={() => checkInput('C')}
								className='bg-btn-menu dark:bg-dark-btn-menu w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								C
							</button>
							<button
								onClick={() => checkInput('±')}
								className='bg-btn-menu dark:bg-dark-btn-menu w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								<UnionIcon />
							</button>
							<button
								onClick={() => checkInput('%')}
								className='bg-btn-menu dark:bg-dark-btn-menu w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								%
							</button>
							<button
								onClick={() => checkInput('÷')}
								className='bg-btn-func text-white w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								÷
							</button>

							<button
								onClick={() => checkInput('7')}
								className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								7
							</button>
							<button
								onClick={() => checkInput('8')}
								className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								8
							</button>
							<button
								onClick={() => checkInput('9')}
								className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								9
							</button>
							<button
								onClick={() => checkInput('x')}
								className='bg-btn-func text-white w-[72px] h-[72px] rounded-3xl text-center transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								x
							</button>

							<button
								onClick={() => checkInput('4')}
								className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								4
							</button>
							<button
								onClick={() => checkInput('5')}
								className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								5
							</button>
							<button
								onClick={() => checkInput('6')}
								className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								6
							</button>
							<button
								onClick={() => checkInput('-')}
								className='bg-btn-func text-white w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								-
							</button>

							<button
								onClick={() => checkInput('1')}
								className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								1
							</button>
							<button
								onClick={() => checkInput('2')}
								className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								2
							</button>
							<button
								onClick={() => checkInput('3')}
								className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								3
							</button>
							<button
								onClick={() => checkInput('+')}
								className='bg-btn-func text-white w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								+
							</button>

							<button
								onClick={() => checkInput('.')}
								className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								.
							</button>
							<button
								onClick={() => checkInput('0')}
								className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								0
							</button>
							<button
								onClick={() => checkInput('←')}
								className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								<BackIcon />
							</button>
							<button
								onClick={() => checkInput('=')}
								className='bg-btn-func text-white w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								=
							</button>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
