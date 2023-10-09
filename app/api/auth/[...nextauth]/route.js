import NextAuth from 'next-auth/next'
import prisma from '../../../libs/prismadb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import bcrypt from 'bcryptjs'

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			profile(profile) {
				return {
					id: profile.sub,
					username: profile.name,
					email: profile.email,
					image: profile.picture,
					birthday: '',
				}
			},
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_ID,
			clientSecret: process.env.FACEBOOK_SECRET,
			profile(profile) {
				return {
					id: profile.id,
					username: profile.name,
					email: profile.email,
					image: profile.picture.data.url,
					birthday: '',
				}
			},
		}),
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' },
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'John Smith',
				},
			},
			async authorize(credentials) {
				// check to see if email and password is there
				if (!credentials.email || !credentials.password) {
					throw new Error('Please enter an email and password')
				}

				// check to see if user exists
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				})

				// if no user was found
				if (!user || !user?.hashedPassword) {
					throw new Error('No user found')
				}

				// check to see if password matches
				const passwordMatch = await bcrypt.compare(
					credentials.password,
					user.hashedPassword
				)

				// if password does not match
				if (!passwordMatch) {
					throw new Error('Incorrect password')
				}

				return user
			},
		}),
	],
	secret: process.env.SECRET,
	session: {
		strategy: 'jwt',
	},
	debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
