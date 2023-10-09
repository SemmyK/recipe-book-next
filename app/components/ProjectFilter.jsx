'use client'

const filterList = [
	'all',
	'meal',
	'soup',
	'salad',
	'smoothie',
	'snack',
	'sauce',
	'side',
	'dessert',
]

function ProjectFilter({ changeFilter, currentFilter }) {
	const handleClick = newFilter => {
		changeFilter(newFilter)
	}
	return (
		<div className='text-center my-6 w-11/12 bg-violet-200 dark:bg-gray-400  rounded-md'>
			<div className='text-center text-violet-600 dark:text-gray-900  font-bold text-lg w-full my-2'>
				Filter by:
			</div>

			<div className='flex-initial flex-column flex-wrap items-center-justify-between my-2'>
				{filterList.map(f => (
					<div
						key={f}
						className='bg-violet-600 dark:bg-gray-600 text-white m-1 inline-block  rounded-lg'
					>
						<button
							onClick={() => handleClick(f)}
							className={`${
								currentFilter === f ? 'active' : ''
							} w-full px-4 py-2 rounded-lg `}
						>
							{f}
						</button>
					</div>
				))}
			</div>
		</div>
	)
}
export default ProjectFilter
