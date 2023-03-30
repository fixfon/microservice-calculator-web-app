type ButtonType =
	| 'number'
	| 'operator'
	| 'clear'
	| 'back'
	| 'sign'
	| 'percent'
	| 'equal';

type CalculatorButtonProps = {
	type: ButtonType;
	buttonText: string;
	
};

const CalculatorButton = ({}: CalculatorButtonProps) => {
	return (
		<button className='bg-btn-menu dark:bg-dark-btn-menu w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
			C
		</button>
	);
};

export default CalculatorButton;
