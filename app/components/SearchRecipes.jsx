'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function SearchRecipes() {
	const router = useRouter()
	const [showSearch, setShowSearch] = useState(false)
	const [showSearchButton, setShowButton] = useState(true)
	const [searchTerm, setSearchTerm] = useState('')

	const handleClick = () => {
		setShowSearch(true)
		setShowButton(false)
	}

	const handleSearch = e => {
		e.preventDefault()
		setShowSearch(false)
		setShowButton(true)

		//prevent submitting empty searchTerm
		if (searchTerm.length !== 0) {
			router.push(`/search?query=${searchTerm}`)
			setSearchTerm('')
		}
	}

	return (
		<div className='flex mx-2 '>
			{showSearchButton && (
				<button
					onClick={handleClick}
					type='button'
					className='order-last dark:bg-gray-700  text-white border-2 border-white hover:bg-white hover:font-bold hover:text-black outline-white dark:text-slate-200  dark:hover:bg-white 
							dark:hover:font-bold dark:hover:text-black focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1'
				>
					<svg
						className='w-5 h-5'
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
					<span className='sr-only'>Search</span>
				</button>
			)}

			{showSearch && (
				<div className='relative flex'>
					<button
						onClick={handleSearch}
						className='absolute inset-y-0 right-4 flex items-center pl-3'
					>
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
						<span className='sr-only'>Search icon</span>
					</button>
					<input
						type='text'
						id='search-navbar'
						className='block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='Search...'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value.trim())}
					/>
				</div>
			)}
		</div>
	)
}
export default SearchRecipes
