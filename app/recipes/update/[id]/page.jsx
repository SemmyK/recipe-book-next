'use client'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import Select from 'react-tailwindcss-select'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { useDatabase } from '@app/hooks/useDatabase'

//options for react select
const options = [
	{ value: 'smoothie', label: 'Smoothie' },
	{ value: 'snack', label: 'Snack' },
	{ value: 'salad', label: 'Salad' },
	{ value: 'soup', label: 'Soup' },
	{ value: 'sauce', label: 'Sauce' },
	{ value: 'meal', label: 'Meal' },
	{ value: 'side', label: 'Side' },
	{ value: 'dessert', label: 'Dessert' },
]
function UpdateRecipe() {
	const router = useRouter()
	const { id } = useParams()
	const { data: session } = useSession()
	const ingredientInput = useRef(null)
	const [editedRecipe, setEditedRecipe] = useState({
		title: '',
		cookingTime: '',
		method: '',
	})
	const {
		user,
		getSingleRecipeData,
		getUsersAndRecipes,
		recipeUser: userData,
		singleRecipe,
	} = useDatabase()
	const [ingredientString, setIngredientString] = useState('')
	const [ingredients, setIngredients] = useState([])
	const [newIngredients, setNewIngredients] = useState([])

	useEffect(() => {
		if (session?.status === 'unauthenticated') {
			router.push('/register')
		}
		if (session?.status === 'authenticated' && user._id !== recipeUser.user) {
			router.push('/')
		}
	})

	const getAlldata = useCallback(
		async id => {
			try {
				const data = await getSingleRecipeData(id)

				data &&
					setEditedRecipe({
						...data[0],
						cookingTime: parseInt(data[0]?.cookingTime.slice(0, 2)),
					})
				setIngredientString(data[0]?.ingredients.toString())
				setIngredients(data[0]?.ingredients)
			} catch (error) {
				console.log(error)
			}
		},
		[getSingleRecipeData]
	)

	useEffect(() => {
		getAlldata(id)
	}, [id, getAlldata])

	const handleChange = e => {
		setEditedRecipe(prev => ({ ...prev, [e.target.id]: e.target.value }))
	}

	const handleAdd = () => {
		if (ingredientString) {
			const newIngArray = ingredientString.split(',')
			console.log(newIngArray)
			setNewIngredients(newIngArray)
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		console.log(editedRecipe, singleRecipe)
		try {
			let editedRecipeCopy = { ...editedRecipe }
			if (newIngredients.length !== 0) {
				editedRecipeCopy.ingredients = newIngredients
			}

			editedRecipeCopy.cookingTime = editedRecipe.cookingTime + ' minutes'
			console.log(editedRecipeCopy)

			await axios
				.patch(`/api/recipes/${id}`, editedRecipeCopy)
				.then(result => {
					console.log(result)
				})
				.catch(err => {
					console.log(err)
				})
		} catch (error) {
			console.log(error)
			toast.error('Something went wrong. Recipe not added.')
		}
		getUsersAndRecipes()
		toast.success('Successfully updated recipe.')
		router.push('/')
		setEditedRecipe({
			title: '',
			cookingTime: '',
			method: '',
		})
		setIngredients([])
	}
	return (
		<main className='create w-full mx-auto'>
			<div className='py-12 mx-auto w-full md:w-2/3'>
				<h2 className='text-2xl font-bold text-center text-violet-900 dark:text-slate-300'>
					Update recipe
				</h2>
				<div className='mt-8 max-w-md mx-auto p-6 shadow-xl dark:shadow-slate-400'>
					<form onSubmit={handleSubmit}>
						<div className='grid grid-cols-1 gap-6'>
							<label className='block'>
								<span className='text-violet-700 dark:text-slate-300'>
									Recipe title:
								</span>
								<input
									type='text'
									required
									value={editedRecipe?.title}
									onChange={handleChange}
									id='title'
									className='mt-1 block w-full rounded-md bg-violet-100 border-transparent focus:border-violet-500 dark:focus:border-white dark:bg-slate-100  focus:bg-white focus:ring-0 dark:focus:ring dark:focus:ring-slate-500'
									placeholder=''
								/>
							</label>

							<label className='block'>
								<span className='text-violet-700 dark:text-slate-300'>
									Cooking Time (in minutes):
								</span>
								<input
									required
									type='number'
									value={parseInt(editedRecipe?.cookingTime)}
									onChange={handleChange}
									id='cookingTime'
									className='mt-1 block w-full rounded-md bg-violet-100 border-transparent focus:border-violet-500 dark:focus:border-white dark:bg-slate-100  focus:bg-white focus:ring-0 dark:focus:ring dark:focus:ring-slate-500'
									placeholder=''
								/>
							</label>

							<label className='block'>
								<span className='text-violet-700 dark:text-slate-300'>
									Write the steps for cooking (separate each step with full
									stop):
								</span>
								<textarea
									required
									rows={3}
									value={editedRecipe?.method}
									onChange={handleChange}
									id='method'
									className='mt-1 block w-full rounded-md bg-violet-100 border-transparent focus:border-violet-500 dark:focus:border-white dark:bg-slate-100  focus:bg-white focus:ring-0 dark:focus:ring dark:focus:ring-slate-500'
								/>
							</label>

							<label className='block'>
								<span className='text-violet-700 dark:text-slate-300'>
									Ingredients (click apply changes to save shanges in
									ingredients):
								</span>
								<p className='text-violet-700 dark:text-slate-300'>
									{' '}
									<span className='font-bold'>Current ingredients:</span>
									{ingredients.length !== 0 &&
										ingredients.map(ing => (
											<span
												className='text-violet-700 dark:text-slate-300'
												key={ing}
											>
												{' '}
												{ing} |
											</span>
										))}
								</p>
								<div className='flex justify-between items-center flex-nowrap p-0 '>
									<textarea
										ref={ingredientInput}
										required
										rows={3}
										value={ingredientString}
										onChange={e => setIngredientString(e.target.value)}
										className='mt-1 block w-full rounded-md bg-violet-100 border-transparent focus:border-violet-500 dark:focus:border-white dark:bg-slate-100  focus:bg-white focus:ring-0 dark:focus:ring dark:focus:ring-slate-500'
									/>

									<button
										type='button'
										onClick={handleAdd}
										className='rounded-full hover:rounded-xl bg-violet-700 text-white h-1/3 p-2  mx-2 dark:bg-neutral-800 dark:text-slate-200 dark:font-bold'
									>
										Apply changes
									</button>
								</div>
								<p className='text-violet-700 dark:text-slate-300'>
									{' '}
									New ingredients:
									{newIngredients.length !== 0 &&
										newIngredients.map(ing => (
											<span
												className='text-violet-700 dark:text-slate-300'
												key={ing}
											>
												{' '}
												{ing} |
											</span>
										))}
								</p>
							</label>

							<div className='flex flex-nowrap flex-row items-center justify-between'>
								<div className='w-1/2  rounded-full hover:rounded-xl bg-violet-700 text-white py-2 px-4 my-2 mx-1 text-center dark:bg-neutral-800 dark:text-slate-200 dark:font-bold'>
									<button
										type='submit'
										className=' rounded-full hover:rounded-xl  text-white py-1 px-2 mx-1 text-center '
									>
										Update recipe
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</main>
	)
}
export default UpdateRecipe
