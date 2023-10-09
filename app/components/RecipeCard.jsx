'use client'
import Link from 'next/link'
import ButtonBox from './ButtonBox'
import { useDatabase } from '@app/hooks/useDatabase'
import { useEffect, useState } from 'react'

function RecipeCard({ recipe }) {
	const { getSingleRecipeData, recipeUser } = useDatabase()

	useEffect(() => {
		const getData = async () => {
			await getSingleRecipeData(recipe._id)
		}

		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<section className=' p-0 flex flex-col justify-center items-center rounded-xl card shadow-lg dark:shadow-slate-400 w-full '>
			<h2 className='text-center p-3 rounded-t-xl bg-violet-900 text-white w-full text-xl font-bold dark:bg-neutral-800 dark:text-gray-300'>
				{recipe.title}
			</h2>

			<div className='my-3 mx-5 text-slate-500 dark:text-slate-400 '>
				<ul className='list-none flex flex-row flex-wrap justify-normal'>
					{recipe.ingredients &&
						recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
				</ul>
			</div>
			<div className='m-4 dark:text-slate-200'>
				{recipe.method && recipe.method.slice(0, 100)}...
			</div>
			<p className='text-slate-500 dark:text-slate-400'>
				{recipe.cookingTime} to make.
			</p>

			<ButtonBox recipeUser={recipe.user} recipe={recipe} text='Cook this' />
		</section>
	)
}
export default RecipeCard
