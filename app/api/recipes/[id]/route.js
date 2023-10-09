import Recipe from '@models/recipeModel'
import User from '@models/userModel'
import { connectDB } from '@utils/db'

//get single recipe
export async function GET(request, { params }) {
	const { id } = params

	try {
		await connectDB()

		let creator = {}
		const recipe = await Recipe.findById(id)
		if (recipe) {
			creator = await User.findById(recipe.user)
		}

		if (!recipe) {
			return new Response('Recipe not found', { status: 404 })
		}

		if (creator && recipe) {
			const recipeData = recipe._doc
			const userDB = creator._doc
			const singleRecipe = { ...recipeData, userData: { ...userDB } }

			return new Response(JSON.stringify(singleRecipe), { status: 200 })
		}
	} catch (error) {
		console.log(error)
		return new Response('Failed to fetch recipe', { status: 500 })
	}
}
//update single recipe

export const PATCH = async (request, { params }) => {
	const { id } = params
	const { title, cookingTime, method, ingredients } = await request.json()

	try {
		await connectDB()

		const updatedRecipe = await Recipe.findByIdAndUpdate(
			id,
			{ title, cookingTime, method, ingredients },
			{ new: true }
		)
		console.log(updatedRecipe)

		if (!updatedRecipe) {
			return new Response('Recipe not found', { status: 404 })
		}

		return new Response(JSON.stringify(updatedRecipe), { status: 200 })
	} catch (error) {
		console.log(error)
		return new Response('Failed to update recipe', { status: 500 })
	}
}
//delete specific Recipe
export const DELETE = async (request, { params }) => {
	const { id } = params

	try {
		await connectDB()

		const recipe = await Recipe.findByIdAndRemove(id)
		console.log(recipe)

		if (!recipe) {
			return new Response('Recipe not found', { status: 404 })
		}

		return new Response('Recipe deleted successfully', { status: 200 })
	} catch (error) {
		console.log(error)
		return new Response('Failed to delete Recipe', { status: 500 })
	}
}
