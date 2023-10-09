import Recipe from '@/models/recipeModel'
import { connectDB } from '@/utils/db'
import User from '@models/userModel'

//get recipes
export const GET = async request => {
	//get searched recipes
	const { searchParams } = new URL(request.url)
	if (searchParams) {
		const searchTerm = searchParams.get('search')
		try {
			await connectDB()
			const queryObject = {}
			if (searchTerm) {
				queryObject.title = { $regex: searchTerm, $options: 'i' }
			}
			const searchedRecipes = await Recipe.find(queryObject).sort({
				createdAt: 'desc',
			})

			if (!searchedRecipes) {
				return new Response('No recipes to show', { status: 200 })
			}

			return new Response(JSON.stringify(searchedRecipes), { status: 200 })
		} catch (error) {
			console.log(error)
			return new Response('Failed to fetch searched recipes', { status: 500 })
		}
	}

	//get all recipes

	try {
		await connectDB()

		const recipes = await Recipe.find().sort({ createdAt: 'desc' })

		if (!recipes) {
			return new Response('No recipes to show', { status: 200 })
		}
		return new Response(JSON.stringify(recipes), { status: 200 })
	} catch (error) {
		console.log(error)
		return new Response('Failed to fetch all recipes', { status: 500 })
	}
}

//create recipe
export async function POST(request) {
	const body = await request.json()
	//destructure product and description from req body

	try {
		const { title, cookingTime, method, type, ingredients, user } = body
		await connectDB()
		const userDB = await User.findById(user)

		if (!title || !cookingTime || !method || !ingredients || !type) {
			res.status(400)
			throw new Error('Please fill all fields')
		}

		if (!userDB) {
			//if user does not exist send back error
			res.status(401)
			throw new Error('Unauthorized access.User not found.')
		}

		if (title && cookingTime && method && ingredients && type) {
			const recipe = await Recipe.create(
				{
					title,
					cookingTime,
					method,
					type,
					ingredients,
					user,
				},
				{ new: true }
			)
			if (recipe) {
				console.log(recipe)

				return new Response(JSON.stringify(recipe), { status: 201 })
			}
		}
		//if user exists
	} catch (error) {
		console.log(error)
		return new Response('Failed to add recipe', { status: 500 })
	}
}
