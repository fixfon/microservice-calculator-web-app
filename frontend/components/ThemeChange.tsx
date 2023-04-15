import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const ThemeChange = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div
			className='transition-all w-24 h-10 dark:bg-btn-number bg-white border-2 py-2 rounded-2xl flex items-center justify-around select-none hover:cursor-pointer hover:shadow-xl dark:hover:shadow-dark-btn-menu dark:hover:shadow-md'
			onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}>
			{theme == 'dark' ? (
				<>
					<div className='w-6 h-6 rounded-[50%] bg-dark-btn-menu inline-block'></div>
					<Image alt='moon' src={'/moon.png'} width={24} height={24} />
				</>
			) : (
				<>
					<Image alt='moon' src={'/sun.svg'} width={24} height={24} />
					<div className='w-6 h-6 rounded-[50%] bg-btn-menu inline-block'></div>
				</>
			)}
		</div>
	);
};

export default ThemeChange;
