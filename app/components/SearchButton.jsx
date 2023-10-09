function SearchButton({ handleSearch }) {
	return (
		<button
			onClick={handleSearch}
			type='submit'
			className='mx-1 border-2 text-gray-500 dark:text-slate-200  hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1'
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
	)
}
export default SearchButton
