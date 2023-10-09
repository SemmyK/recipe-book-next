'use client'
import { useDatabase } from '@app/hooks/useDatabase'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Select from 'react-tailwindcss-select'
import { toast } from 'react-toastify'

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
function CreateRecipe() {
	const router = useRouter()
	const { data: session } = useSession()
	const { getUsersAndRecipes } = useDatabase()
	const sessionUser = session?.user
	const ingredientInput = useRef(null)
	const [type, setType] = useState({ value: 'meal', label: 'Meal' })
	const [ingredient, setIngredient] = useState('')
	const [ingredients, setIngredients] = useState([])
	const [newRecipe, setNewRecipe] = useState({
		title: '',
		cookingTime: '',
		method: '',
	})

	useEffect(() => {
		if (session?.status === 'unauthenticated') {
			router.push('/register')
		}
	})

	const handleChange = e => {
		setNewRecipe(prev => ({ ...prev, [e.target.id]: e.target.value }))
	}

	const handleAdd = () => {
		if (ingredient !== '') {
			if (!ingredients.includes(ingredient)) {
				setIngredients(prev => [...prev, ingredient.trim()])
				setIngredient('')
			} else {
				toast.error('You already have that ingredient added.')
			}
		} else {
			toast.error('Nothing there to add.')
		}
		ingredientInput.current.focus()
	}

	const handleSubmit = async e => {
		e.preventDefault()
		console.log(newRecipe)
		try {
			const userData = await fetch('/api/users', {
				method: 'POST',
				body: JSON.stringify({
					email: sessionUser?.email,
				}),
			})

			const data = await userData.json()
			console.log(data)

			if (sessionUser && newRecipe && ingredients.length !== 0) {
				const recipeData = {
					title: newRecipe.title,
					type: type?.value,
					ingredients: ingredients,
					cookingTime: newRecipe.cookingTime + ' minutes',
					method: newRecipe.method + ' Enjoy your meal!',
					user: data?._id,
				}

				console.log(recipeData)
				await axios
					.post('/api/recipes', recipeData)
					.then(result => {
						console.log(result)
						getUsersAndRecipes()
					})
					.catch(err => {
						console.log(err)
					})
			}
			toast.success('Successfully added recipe.')
			setNewRecipe({
				title: '',
				cookingTime: '',
				method: '',
			})
			setIngredients([])
			router.push('/')
		} catch (error) {
			console.log(error)
			toast.error('Something went wrong. Recipe not added.')
		}
	}
	return (
		<main className='create w-full mx-auto'>
			<div className='py-12 mx-auto w-full md:w-2/3'>
				<h2 className='text-2xl font-bold text-center text-violet-900 dark:text-slate-300'>
					Create recipe
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
									value={newRecipe.title}
									onChange={handleChange}
									id='title'
									className='mt-1 block w-full rounded-md bg-violet-100 border-transparent focus:border-violet-500 dark:focus:border-white dark:bg-slate-100  focus:bg-white focus:ring-0 dark:focus:ring dark:focus:ring-slate-500'
									placeholder=''
								/>
							</label>

							<label className='block p-0  h-full '>
								<span className='text-violet-700 dark:text-slate-300 mb-2 block'>
									Type of recipe:
								</span>
								<Select
									value={type}
									primaryColor={'violet'}
									id='type'
									onChange={value => setType(value)}
									options={options}
									classNames={{
										menuButton: ({ isDisabled }) =>
											`flex text-sm text-neutral-800 border border-violet-300
											dark:border:slate-200 rounded shadow-sm transition-all duration-300
											bg-violet-100
									focus:bg-white 
											dark:bg-slate-100  dark:text-neutral-800 focus:outline-none ${
												isDisabled
													? 'bg-violet-200'
													: 'bg-violet-100 hover:border-violet-400 focus:border-violet-500 focus:ring focus:ring-violet-500/20 dark:hover:border-neutral-400 dark:focus:border-neutral-500 dark:focus:ring dark:focus:ring-slate-500'
											}`,
										searchBox: 'h-full dark:focus:border-neutral-200',
										menu: 'block w-full h-full rounded-md bg-violet-100 border-transparent focus:border-violet-500 dark:focus:border-white focus:bg-white focus:ring-0 dark:bg-neutral-600 dark:text-slate-200',
										listItem: ({ isSelected }) =>
											`block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded   ${
												isSelected
													? `text-white bg-violet-500 dark:bg-neutral-800 dark:text-slate-200`
													: `text-violet-500 hover:bg-violet-200 hover:text-violet-500 dark:hover:bg-neutral-200 dark:hover:text-neutral-700  dark:bg-neutral-600 dark:text-slate-200`
											}`,
									}}
								/>

								{/* <select
									className='mt-1 block w-full rounded-md bg-violet-100 border-transparent focus:border-violet-500 dark:focus:border-white focus:bg-white focus:ring-0'
									id='type'
									onChange={e => setType(e.target.value)}
								>
									<option value='meal'>Meal</option>
									<option value='soup'>Soup</option>
									<option value='salad'>Salad</option>
									<option value='snack'>Snack</option>
									<option value='smoothie'>Smoothie</option>
									<option value='sauce'>Sauce</option>
									<option value='side'>Side dish</option>
									<option value='dessert'>Dessert</option>
								</select> */}
							</label>

							<label className='block'>
								<span className='text-violet-700 dark:text-slate-300'>
									Cooking Time (in minutes):
								</span>
								<input
									required
									type='number'
									value={newRecipe.cookingTime}
									onChange={handleChange}
									id='cookingTime'
									className='mt-1 block w-full rounded-md bg-violet-100 border-transparent focus:border-violet-500 dark:focus:border-white dark:bg-slate-100  focus:bg-white focus:ring-0 dark:focus:ring dark:focus:ring-slate-500'
									placeholder=''
								/>
							</label>

							<label className='block'>
								<span className='text-violet-700 dark:text-slate-300'>
									Ingredients (add one by one):
								</span>
								<div className='flex justify-between items-stretch flex-nowrap p-0 '>
									<input
										ref={ingredientInput}
										type='text'
										value={ingredient}
										onChange={e => setIngredient(e.target.value)}
										className='mt-1 block w-full rounded-md bg-violet-100 border-transparent focus:border-violet-500 dark:focus:border-white dark:bg-slate-100  focus:bg-white focus:ring-0 dark:focus:ring dark:focus:ring-slate-500'
									/>
									<button
										type='button'
										onClick={handleAdd}
										className='rounded-full hover:rounded-xl bg-violet-700 text-white py-2 px-4 mx-2 dark:bg-neutral-800 dark:text-slate-200 dark:font-bold'
									>
										Add
									</button>
								</div>
								<p className='text-violet-700 dark:text-slate-300'>
									{' '}
									Current ingredients:
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
							</label>

							<label className='block'>
								<span className='text-violet-700 dark:text-slate-300'>
									Write the steps for cooking (separate each step with full
									stop):
								</span>
								<textarea
									required
									rows={3}
									value={newRecipe.method}
									onChange={handleChange}
									id='method'
									className='mt-1 block w-full rounded-md bg-violet-100 border-transparent focus:border-violet-500 dark:focus:border-white dark:bg-slate-100  focus:bg-white focus:ring-0 dark:focus:ring dark:focus:ring-slate-500'
								/>
							</label>

							<div className='flex flex-nowrap flex-row items-center justify-between'>
								<div className='w-1/2  rounded-full hover:rounded-xl bg-violet-700 text-white py-2 px-4 my-2 mx-1 text-center dark:bg-neutral-800 dark:text-slate-200 dark:font-bold'>
									<button
										type='submit'
										className=' rounded-full hover:rounded-xl  text-white py-1 px-2 mx-1 text-center '
									>
										Add new recipe
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
export default CreateRecipe
