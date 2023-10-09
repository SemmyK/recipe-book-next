'use client'

//next & react
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
//third-party packages
import { toast } from 'react-toastify'
import axios from 'axios'
//assets
import visiblityIcon from '../../public/assets/visibilityIcon.svg'
//components
import HorizontalLine from '@app/components/HorizontalLine'
import SocialButtonBox from '@app/components/social/SocialButtonBox'
import { signIn, useSession } from 'next-auth/react'
import { useDatabase } from '@app/hooks/useDatabase'

function Register() {
	const router = useRouter()
	const { data: session } = useSession()
	const { getUsersAndRecipes, getCurrentUser } = useDatabase()
	const [showPassword, setShowPassword] = useState(false)
	const [userData, setUserData] = useState({
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		birthday: '',
		password: '',
	})

	useEffect(() => {
		if (session?.status === 'authenticated') {
			router.push('/')
		}
	})

	const handleSubmit = async e => {
		e.preventDefault()
		console.log(userData)

		if (userData.password && userData.password.length < 8) {
			toast.info('Password must be at least 8 characters long.')
		}

		try {
			//send data to backend
			await axios.post('/api/register', userData)
			const signInData = {
				username: userData.username,
				password: userData.password,
				email: userData.email,
			}
			signIn('credentials', { ...signInData, redirect: false }).then(
				callback => {
					if (callback?.error) {
						toast.error(callback.error)
					}

					if (callback?.ok && !callback?.error) {
						toast.success('User has been registered!')
					}
					getUsersAndRecipes()
					getCurrentUser()
					router.push('/')
				}
			)
		} catch (error) {
			console.log(error)
			toast.error('Something went wrong!')
		}
	}

	return (
		<div className='py-12 mx-auto w-4/5'>
			<h2 className='text-2xl font-bold text-center text-violet-900 dark:text-slate-300'>
				Register
			</h2>
			<div className='mt-8 max-w-md mx-auto p-6 shadow-xl dark:shadow-slate-400'>
				<form onSubmit={handleSubmit}>
					<div className='grid grid-cols-1 gap-6'>
						<label className='block'>
							<span className='text-violet-700 dark:text-slate-300'>
								First name
							</span>
							<input
								type='text'
								required
								value={userData.firstName}
								onChange={e =>
									setUserData({ ...userData, firstName: e.target.value })
								}
								className='mt-1 block w-full rounded-md bg-violet-100 border-transparent focus:border-violet-500 dark:focus:border-white focus:bg-white focus:ring-0'
								placeholder=''
							/>
						</label>

						<label className='block'>
							<span className='text-violet-700 dark:text-slate-300'>
								Last name
							</span>
							<input
								type='text'
								required
								value={userData.lastName}
								onChange={e =>
									setUserData({ ...userData, lastName: e.target.value })
								}
								className='mt-1 block w-full rounded-md bg-violet-100 border-transparent focus:border-violet-500 dark:focus:border-white focus:bg-white focus:ring-0'
								placeholder=''
							/>
						</label>

						<label className='block'>
							<span className='text-violet-700 dark:text-slate-300'>
								Username
							</span>
							<input
								required
								type='text'
								value={userData.username}
								onChange={e =>
									setUserData({ ...userData, username: e.target.value })
								}
								className='mt-1 block w-full rounded-md bg-violet-100 border-transparent focus:border-violet-500 dark:focus:border-white focus:bg-white focus:ring-0'
								placeholder=''
							/>
						</label>

						<label className='block'>
							<span className='text-violet-700 dark:text-slate-300'>
								Birthday
							</span>
							<input
								type='date'
								value={userData.birthday}
								onChange={e =>
									setUserData({
										...userData,
										birthday: e.target.value,
									})
								}
								className='mt-1 block w-full rounded-md bg-violet-100 border-transparent focus:border-violet-500 dark:focus:border-white focus:bg-white focus:ring-0'
							/>
						</label>

						<label className='block'>
							<span className='text-violet-700 dark:text-slate-300'>
								Email address
							</span>
							<input
								type='email'
								required
								value={userData.email}
								onChange={e =>
									setUserData({ ...userData, email: e.target.value })
								}
								className='mt-1 block w-full rounded-md bg-violet-100 border-transparent focus:border-violet-500 dark:focus:border-white focus:bg-white focus:ring-0'
								placeholder='john@example.com'
							/>
						</label>

						<label className='block'>
							<span className='text-violet-700 dark:text-slate-300'>
								Password
							</span>
							<div className='flex flex-nowrap flex-row justify-between items-center '>
								<input
									type={showPassword ? 'text' : 'password'}
									required
									value={userData.password}
									onChange={e => {
										setUserData({ ...userData, password: e.target.value })
									}}
									className='mt-1 mr-1 block w-full rounded-md bg-violet-100 border-transparent focus:border-violet-500 dark:focus:border-white focus:bg-white focus:ring-0'
									placeholder=''
								/>
								<Image
									className='dark:bg-slate-300 m-0 rounded-full h-fit dark:invert'
									src={visiblityIcon}
									alt='show password'
									onClick={() => setShowPassword(prev => !prev)}
								/>
							</div>
						</label>
						<div className='flex flex-nowrap flex-row items-center justify-between'>
							<div className='w-1/2  rounded-full hover:rounded-xl bg-violet-700 text-white py-2 px-4 my-2 mx-1 text-center dark:bg-neutral-800 dark:text-slate-200 dark:font-bold'>
								<button
									type='submit'
									className=' rounded-full hover:rounded-xl  text-white py-1 px-2 mx-1 text-center '
								>
									Register
								</button>
							</div>
							<div className='w-1/2 rounded-full hover:rounded-xl bg-violet-700 text-white py-2 px-4 my-2 mx-1 text-center dark:bg-neutral-800 dark:text-slate-200 dark:font-bold'>
								<Link href='/sign-in'>
									<button className='rounded-full hover:rounded-xl text-white py-1 px-2 mx-1'>
										Login instead
									</button>
								</Link>
							</div>
						</div>
					</div>
				</form>
				<HorizontalLine text='Or sign up with' />
				{/* social buttons */}
				<SocialButtonBox />
			</div>
		</div>
	)
}
export default Register
