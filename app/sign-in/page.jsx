'use client'

//next & react
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
//third-party packages
import { toast } from 'react-toastify'
//assets
import visiblityIcon from '../../public/assets/visibilityIcon.svg'
//components
import HorizontalLine from '@app/components/HorizontalLine'
import SocialButtonBox from '@app/components/social/SocialButtonBox'
import { useDatabase } from '@app/hooks/useDatabase'

function SignIn() {
	const session = useSession()
	const router = useRouter()
	const { getUsersAndRecipes, getCurrentUser } = useDatabase()
	const [showPassword, setShowPassword] = useState(false)
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	})

	useEffect(() => {
		if (session?.status === 'authenticated') {
			router.push('/')
		}
	})

	const handleSubmit = async e => {
		e.preventDefault()

		//send data to backend
		signIn('credentials', { ...userData, redirect: false }).then(callback => {
			if (callback?.error) {
				toast.error(callback.error)
			}

			if (callback?.ok && !callback?.error) {
				toast.success('Logged in successfully!')
			}
			getUsersAndRecipes()
			getCurrentUser()
			router.push('/')
		})
	}
	return (
		<div className='py-12 mx-auto w-4/5'>
			<h2 className='text-2xl font-bold text-center text-violet-900 dark:text-slate-300'>
				Login
			</h2>
			<div className='mt-8 max-w-md mx-auto p-6 shadow-xl dark:shadow-slate-400'>
				<form onSubmit={handleSubmit}>
					<div className='grid grid-cols-1 gap-6'>
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
									Login
								</button>
							</div>
							<div className='w-1/2 rounded-full hover:rounded-xl bg-violet-700 text-white py-2 px-4 my-2 mx-1 text-center dark:bg-neutral-800 dark:text-slate-200 dark:font-bold'>
								<Link href='/register'>
									<button className='rounded-full hover:rounded-xl text-white py-1 px-2 mx-1'>
										Register instead
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
export default SignIn
