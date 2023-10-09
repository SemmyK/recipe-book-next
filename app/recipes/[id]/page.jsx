'use client'

import ButtonBox from '@app/components/ButtonBox'
import { useDatabase } from '@app/hooks/useDatabase'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

function RecipeDetails() {
	const { id } = useParams()
	const { recipes, getSingleRecipeData, recipeUser, singleRecipe, users } =
		useDatabase()
	const [recipe, setRecipe] = useState()
	const [userData, setUserData] = useState()

	const getAlldata = useCallback(async id => {
		try {
			const data = await getSingleRecipeData(id)

			if (data) {
				setRecipe(data[0])
				setUserData(data[1])
			} else if (data && data.length !== 0) {
				setUserData(recipeUser)
				setRecipe(singleRecipe)
			} else {
				const rec = recipes.filter(r => r._id.toString() === id)
				const u = users.filter(user => user._id.toString() === rec[0].user)
				setRecipe(rec[0])
				setUserData(u[0])
			}
		} catch (error) {
			console.log(error)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			await getAlldata(id)
		}
		fetchData()
	}, [id, getAlldata])

	return (
		recipe && (
			<main className='my-20 mx-auto p-0 flex flex-col justify-center items-center rounded-xl card shadow-lg w-4/5 recipe'>
				<h2 className='text-center p-3 rounded-t-xl bg-violet-900 text-white w-full text-xl font-bold dark:bg-neutral-800'>
					{recipe?.title}
				</h2>
				{userData && (
					<p className='text-violet-500 mt-4 mb-1 font-semibold text-xl text-center dark:text-slate-300'>
						Created by{' '}
						<span className='hover:underline'>
							<Link href={`/profile/${userData._id}`}>{userData.username}</Link>
						</span>
					</p>
				)}
				<p className='text-slate-500 my-4 font-bold text-center'>
					{recipe.cookingTime} to make.
				</p>
				<div className='my-3 mx-5 text-slate-500 '>
					<ul className={`p-1`}>
						{recipe.ingredients &&
							recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
					</ul>
				</div>
				<div className='m-4 p-2 w-3/4'>
					<ol className='mx-2'>
						{recipe.length !== 0 &&
							recipe?.method &&
							recipe?.method
								.split('.')
								.map((step, index) => <li key={index}>{step}</li>)}
					</ol>
				</div>

				<ButtonBox
					recipe={recipe}
					recipeUser={recipe.user}
					text='Back to Homepage'
				/>
			</main>
		)
	)
}
export default RecipeDetails
