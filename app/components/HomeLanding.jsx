'use client'
import { Suspense, useEffect, useState } from 'react'
import ProjectFilter from './ProjectFilter'
import RecipeList from './RecipeList'
import Loading from '../loading'
import { useSession } from 'next-auth/react'
import { useDatabase } from '@app/hooks/useDatabase'

function HomeLanding() {
	const { data: session } = useSession()
	const { recipes, getUsersAndRecipes, getCurrentUser } = useDatabase()

	const [filter, setFilter] = useState('all')

	useEffect(() => {
		getUsersAndRecipes()
	}, [getUsersAndRecipes])

	useEffect(() => {
		if (session) {
			getCurrentUser()
		}
	}, [session, getCurrentUser])

	const changeFilter = newFilter => {
		setFilter(newFilter)
	}

	const filteredRecipes = recipes
		? recipes.filter(document => {
				switch (filter) {
					case 'all':
						return true
					case 'meal':
					case 'snack':
					case 'salad':
					case 'side':
					case 'smoothie':
					case 'soup':
					case 'sauce':
					case 'dessert':
						return document.type === filter
					default:
						return true
				}
		  })
		: null

	return (
		<article className='flex flex-col md:flex-wrap md:justify-center items-center justify-between home w-full'>
			<ProjectFilter changeFilter={changeFilter} currentFilter={filter} />
			<Suspense fallback={<Loading />}>
				{recipes && <RecipeList recipes={filteredRecipes} />}
			</Suspense>
		</article>
	)
}
export default HomeLanding
