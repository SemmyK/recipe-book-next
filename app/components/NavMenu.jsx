'use client'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
//assets
import burger from '../../public/assets/burger.png'
import X from '../../public/assets/x.svg'
import hamburger from '../../public/assets/hamburger-menu.png'
//components
import SearchRecipes from './SearchRecipes'
import { useDatabase } from '@app/hooks/useDatabase'

function NavMenu() {
	const pathname = usePathname()
	const { data: session } = useSession()
	const { user: userData } = useDatabase()
	const [show, setShow] = useState(false)

	return (
		<nav className='flex flex-wrap sm:flex-nowrap items-center justify-between w-full border-0 bg-violet-800 dark:bg-neutral-800 m-0 p-0'>
			<Link href='/' className='ml-2 flex items-center'>
				<Image
					src={burger}
					className='h-12 mr-3 bg-violet-500 dark:bg-gray-400 rounded-full'
					alt='Flowbite Logo'
					width={50}
					height={80}
					priority
				/>
				<span className='self-center text-2xl font-semibold whitespace-nowrap text-white'>
					RecipeBook
				</span>
			</Link>

			<div className='max-w-screen-xl flex flex-nowrap items-end md:items-center sm:justify-between justify-center p-4 '>
				<div className='flex flex-nowrap order-last justify-end md:justify-center align-center  my-1'>
					<SearchRecipes />

					<div className='md:hidden order-last'>
						<button
							onClick={() => setShow(true)}
							data-collapse-toggle='navbar-search'
							type='button'
							className='order-last inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-slate-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
							aria-controls='navbar-search'
							aria-expanded='false'
						>
							<span className='sr-only'>Open main menu</span>
							{/* <Image
								src={hamburger}
								alt='hamburger menu'
								width={30}
								height={30}
							/> */}
							<svg
								className='w-5 h-5'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 17 14'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M1 1h15M1 7h15M1 13h15'
								/>
							</svg>
						</button>
					</div>
					{/* big screen navigation menu */}
					<div
						className='items-center justify-between hidden w-full md:flex md:w-auto'
						id='navbar-search'
					>
						<div className='relative mt-3 md:hidden'>
							<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
								<svg
									className='w-4 h-4 text-gray-500 dark:text-gray-400'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 20 20'
								>
									<path
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
									/>
								</svg>
							</div>
							<input
								type='text'
								id='search-navbar'
								className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								placeholder='Search...'
							/>
						</div>

						<ul className='flex flex-col justify-center items-center p-4 md:p-0 mt-4 font-medium   md:flex-row  md:mt-0  dark:bg-transparent text-white'>
							<li
								className={`hover:bg-white hover:text-black text-white  p-2 rounded bg-transparent dark:bg-gray-700 dark:hover:bg-slate-300
							dark:hover:font-bold dark:hover:text-gray-700 mx-1 ${
								pathname === '/' ? 'activeNav' : ''
							}`}
							>
								<Link href='/'>Home</Link>
							</li>
							{session && (
								<li
									className={`hover:bg-white hover:text-black text-white p-2 rounded bg-transparent  dark:bg-gray-700 dark:hover:bg-slate-300
							dark:hover:font-bold dark:hover:text-gray-700 mx-1 ${
								pathname === '/create' ? 'activeNav' : ''
							}`}
								>
									<Link href='/create'>Create</Link>
								</li>
							)}
							{!session && (
								<li
									className='hover:bg-white hover:text-black text-white  rounded bg-transparent dark:bg-gray-700 dark:hover:bg-slate-300
							dark:hover:font-bold dark:hover:text-gray-700 mx-1'
								>
									<Link href='/register'>
										<button
											type='button'
											className={`text-white border-2 border-white hover:bg-white hover:font-bold hover:text-black outline-white  font-medium rounded-lg text-sm px-4 py-2 text-center ${
												pathname === '/register' ? 'activeNav' : ''
											}`}
										>
											Register
										</button>
									</Link>
								</li>
							)}

							{!session && (
								<li
									className='hover:bg-white hover:text-black text-white   rounded bg-transparent dark:bg-gray-700 dark:hover:bg-slate-300
							dark:hover:font-bold dark:hover:text-gray-700 mx-1'
								>
									<Link href='/sign-in'>
										<button
											type='button'
											className={`text-white border-2 border-white hover:bg-white hover:font-bold hover:text-black outline-white  font-medium rounded-lg text-sm px-4 py-2 text-center ${
												pathname === '/sign-in' ? 'activeNav' : ''
											}`}
										>
											Login
										</button>
									</Link>
								</li>
							)}

							{session && userData && (
								<li
									className={`hover:bg-white hover:text-black text-white p-2 rounded bg-transparent dark:bg-gray-700 dark:hover:bg-slate-300
							dark:hover:font-bold dark:hover:text-gray-700 mx-1 ${
								pathname === '/profile' ? 'activeNav' : ''
							}`}
								>
									<Link href={`/profile/${userData._id}`}>Profile</Link>
								</li>
							)}

							{session && (
								<li
									className='hover:bg-white hover:text-black text-white   rounded bg-transparent dark:bg-gray-700 dark:hover:bg-slate-300
							dark:hover:font-bold dark:hover:text-gray-700 mx-1'
								>
									<button
										onClick={() => signOut()}
										type='button'
										className={`text-white border-2 border-white hover:bg-white hover:font-bold hover:text-black outline-white  font-medium rounded-lg text-sm px-4 py-2 text-center `}
									>
										Sign out
									</button>
								</li>
							)}

							<li className='md:hidden'>
								<button
									onClick={() => setShow(false)}
									data-collapse-toggle='navbar-search'
									type='button'
									className='order-last inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
									aria-controls='navbar-search'
									aria-expanded='false'
								>
									<span className='sr-only'>Open main menu</span>
									<Image
										src={hamburger}
										alt='hamburger menu'
										width={30}
										height={30}
									/>
									{/* <svg
										className='w-5 h-5'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 17 14'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M1 1h15M1 7h15M1 13h15'
										/>
									</svg> */}
								</button>
							</li>
						</ul>
					</div>

					{/* small screen navigation */}

					{show && (
						<div
							className='flex items-end justify-end flex-row md:hidden w-full  m-0 p-0 z-10'
							id='navbar-search'
						>
							<ul className='flex flex-col justify-end items-end  md:p-0 mt-4 font-medium   md:flex-row  md:mt-0  dark:bg-transparent text-white'>
								<li className='absolute top-2 right-2  md:hidden z-20 '>
									<button
										onClick={() => setShow(false)}
										data-collapse-toggle='navbar-search'
										type='button'
										className=' inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-neutral-800 dark:focus:ring-violet-600'
										aria-controls='navbar-search'
										aria-expanded='false'
									>
										<span className='sr-only'>Open main menu</span>
										<Image src={X} width={30} height={30} alt='x' />
									</button>
								</li>
								<div className='mx-0 px-4 absolute top-0 right-0 bg-violet-600 h-full w-1/4 dark:bg-neutral-600'>
									<li
										onClick={() => setShow(false)}
										className='hover:bg-white hover:text-black text-white  p-2 rounded bg-transparent dark:bg-gray-700 dark:hover:bg-slate-300
							dark:hover:font-bold dark:hover:text-gray-700 mx-1 mt-14 mb-2'
									>
										<Link href='/'>Home</Link>
									</li>
									{session && (
										<li
											onClick={() => setShow(false)}
											className='hover:bg-white hover:text-black text-white p-2 rounded bg-transparent dark:bg-gray-700 dark:hover:bg-slate-300
							dark:hover:font-bold dark:hover:text-gray-700 mx-1 mb-2'
										>
											<Link href='/create'>Create</Link>
										</li>
									)}
									{!session && (
										<li
											onClick={() => setShow(false)}
											className='hover:bg-white hover:text-black text-white  rounded bg-transparent dark:bg-gray-700 dark:hover:bg-slate-300
							dark:hover:font-bold dark:hover:text-gray-700 mx-1 mb-4'
										>
											<Link href='/register'>
												<button
													type='button'
													className='text-white border-2 border-white hover:bg-white hover:font-bold hover:text-black outline-white  font-medium rounded-lg text-sm px-4 py-2 text-center w-full'
												>
													Register
												</button>
											</Link>
										</li>
									)}

									{!session && (
										<li
											onClick={() => setShow(false)}
											className='hover:bg-white hover:text-black text-white  rounded bg-transparent dark:bg-gray-700 dark:hover:bg-slate-300
							dark:hover:font-bold dark:hover:text-gray-700 mx-1 mb-4'
										>
											<Link href='/sign-in'>
												<button
													type='button'
													className='text-white border-2 border-white hover:bg-white hover:font-bold hover:text-black outline-white  font-medium rounded-lg text-sm px-4 py-2 text-center w-full'
												>
													Login
												</button>
											</Link>
										</li>
									)}

									{session && (
										<li
											onClick={() => setShow(false)}
											className='hover:bg-white hover:text-black text-white p-2 rounded bg-transparent dark:bg-gray-700 dark:hover:bg-slate-300
							dark:hover:font-bold dark:hover:text-gray-700 mx-1'
										>
											<Link href={`/profile/${userData._id}`}>Profile</Link>
										</li>
									)}

									{session && (
										<li
											className='hover:bg-white hover:text-black text-white   rounded bg-transparent dark:bg-gray-700 dark:hover:bg-slate-300
							dark:hover:font-bold dark:hover:text-gray-700 mx-1'
										>
											<button
												onClick={() => signOut()}
												type='button'
												className={`text-white border-2 border-white hover:bg-white hover:font-bold hover:text-black outline-white  font-medium rounded-lg text-sm px-4 py-2 text-center `}
											>
												Sign out
											</button>
										</li>
									)}
								</div>
							</ul>
						</div>
					)}
				</div>
			</div>
		</nav>
	)
}
export default NavMenu
