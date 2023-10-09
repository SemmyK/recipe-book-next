//get single user recipes

import Recipe from '@models/recipeModel'
import { connectDB } from '@utils/db'

export async function GET(request, { params }) {
	const { id } = params

	try {
		await connectDB()

		const recipes = await Recipe.find({ user: id })

		if (!recipes) {
			return new Response('Recipes not found', { status: 404 })
		}

		return new Response(JSON.stringify(recipes), { status: 200 })
	} catch (error) {
		console.log(error)
		return new Response('Failed to fetch Recipes', { status: 500 })
	}
}
