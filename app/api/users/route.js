import User from '@models/userModel'
import { connectDB } from '@utils/db'
import prisma from '../../libs/prismadb'

export async function GET(request) {
	try {
		await connectDB()
		const dbUsers = await User.find().select('-password')

		if (dbUsers && dbUsers.length !== 0) {
			return new Response(JSON.stringify(dbUsers), { status: 200 })
		}
	} catch (error) {
		console.log(error)
		throw new Error('Fail to add user.')
	}
}
//add google and fcb auth users to main users db
export async function POST(request) {
	const body = await request.json()
	const { email } = body
	console.log(email)
	try {
		await connectDB()
		const dbUser = await User.findOne({ email }).select('-password')

		//if user is alredy in DB return that user data
		if (dbUser) {
			return new Response(JSON.stringify(dbUser), { status: 200 })
		}

		//if user doesn't exist in main DB check if it exist in auth DB and if exist use data from auth DB to create user in main DB
		if (!dbUser) {
			let exist = await prisma.user.findUnique({
				where: {
					email,
				},
			})
			if (exist) {
				// CREATE USER in main DB
				const user = await User.create({
					username: exist.username,
					email: exist.email,
					firstName: '',
					lastName: '',
					birthday: '',
					theme: '#11AABA',
					password: exist.hashedPassword || '',
				})

				if (user) {
					return new Response(JSON.stringify(user), { status: 200 })
				}
			}
		}
	} catch (error) {
		console.log(error)
		throw new Error('Fail to add user.')
	}
}
