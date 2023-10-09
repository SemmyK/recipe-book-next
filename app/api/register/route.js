import bcrypt from 'bcryptjs'
import prisma from '../../libs/prismadb'
import { NextResponse } from 'next/server'
import { connectDB } from '@utils/db'
import User from '@models/userModel'

export async function POST(request) {
	const body = await request.json()
	const { username, email, password, lastName, firstName, birthday } = body

	if (!username || !email || !password) {
		return new NextResponse('Missing Fields', { status: 400 })
	}

	const exist = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	if (exist) {
		throw new Error('Email already exists')
	}
	const salt = await bcrypt.genSalt(12)
	const hashedPassword = await bcrypt.hash(password, salt)

	const user = await prisma.user.create({
		data: {
			username,
			email,
			hashedPassword,
		},
	})

	if (user) {
		await connectDB()
		await User.create({
			...user,
			_id: user.id,
			firstName,
			lastName,
			birthday: birthday || '',
			password: user.hashedPassword,
		})
	}

	return NextResponse.json(user)
}
