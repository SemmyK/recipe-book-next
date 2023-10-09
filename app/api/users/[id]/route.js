//get user profile

import User from '@models/userModel'
import { connectDB } from '@utils/db'

//get single user
export async function GET(request, { params }) {
	const { id } = params
	try {
		await connectDB()

		const user = await User.findById(id)

		if (!user) {
			return new Response('User not found', { status: 404 })
		}

		return new Response(JSON.stringify(user), { status: 200 })
	} catch (error) {
		console.log(error)
		return new Response('Failed to fetch user', { status: 500 })
	}
}

//update user profile
export async function PUT(request) {}

//delete user profile
export async function DELETE(request) {}
