import Head from 'next/head';
import { Work_Sans } from 'next/font/google';
import ThemeChange from '@/components/ThemeChange';
import UnionIcon from '@/components/UnionIcon';
import BackIcon from '@/components/BackIcon';

const work_sans = Work_Sans({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
});

export default function Home() {
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
								prev
							</div>
							<div className='w-full text-right text-6xl'>current</div>
						</div>
						<div className='grid grid-cols-4 w-full place-items-center h-3/5'>
							<button className='bg-btn-menu dark:bg-dark-btn-menu w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								C
							</button>
							<button className='bg-btn-menu dark:bg-dark-btn-menu w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								<UnionIcon />
							</button>
							<button className='bg-btn-menu dark:bg-dark-btn-menu w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								%
							</button>
							<button className='bg-btn-func text-white w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								÷
							</button>

							<button className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								7
							</button>
							<button className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								8
							</button>
							<button className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								9
							</button>
							<button className='bg-btn-func text-white w-[72px] h-[72px] rounded-3xl text-center transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								x
							</button>

							<button className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								4
							</button>
							<button className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								5
							</button>
							<button className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								6
							</button>
							<button className='bg-btn-func text-white w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								-
							</button>

							<button className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								1
							</button>
							<button className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								2
							</button>
							<button className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								3
							</button>
							<button className='bg-btn-func text-white w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								+
							</button>

							<button className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								.
							</button>
							<button className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								0
							</button>
							<button className='bg-white dark:bg-btn-number w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								<BackIcon />
							</button>
							<button className='bg-btn-func text-white w-[72px] h-[72px] rounded-3xl transition-shadow hover:shadow-xl dark:hover:shadow-slate-800'>
								=
							</button>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
