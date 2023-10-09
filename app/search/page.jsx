'use client'

import RecipeList from '@app/components/RecipeList'
import Loading from '@app/loading'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

function Search() {
	const searchParams = useSearchParams()
	const search = searchParams.get('query')
	const [searchedRecipes, setSearchedRecipes] = useState(null)

	useEffect(() => {
		const fetchRecipes = async () => {
			const response = await fetch(`/api/recipes?search=${search}`)
			const data = await response.json()

			setSearchedRecipes(data)
		}
		fetchRecipes()
	}, [search])

	return (
		<article className='flex flex-col md:flex-wrap md:justify-center items-center justify-between home'>
			<Suspense fallback={<Loading />}>
				{search && searchedRecipes && searchedRecipes.length === 0 ? (
					<h2 className='text-2xl p-4 m-2 rounded-lg font-bold text-center text-violet-900 dark:text-slate-300 shadow-lg dark:shadow-slate-400'>
						No recipes containing word{' '}
						<span className='text-3xl underline'>{search}</span>
					</h2>
				) : (
					<h2 className='text-2xl p-4 m-2 rounded-lg font-bold text-center text-violet-900 dark:text-slate-300 shadow-lg dark:shadow-slate-400'>
						Recipes containing word{' '}
						<span className='text-3xl underline'>{search}</span>
					</h2>
				)}

				{searchedRecipes && searchedRecipes.length !== 0 ? (
					<RecipeList recipes={searchedRecipes} />
				) : (
					<Link href='/'>
						<button className='rounded-full hover:rounded-xl bg-violet-700 text-white py-2 px-4 m-2 dark:bg-neutral-800 dark:text-slate-200 dark:font-bold'>
							Back to Homepage
						</button>
					</Link>
				)}
			</Suspense>
		</article>
	)
}
export default Search
