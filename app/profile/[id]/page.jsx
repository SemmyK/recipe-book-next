'use client'
import RecipeList from '@app/components/RecipeList'
import { useParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { format } from 'date-fns'
import Loading from '@app/loading'

import { useDatabase } from '@app/hooks/useDatabase'

function SingleUser() {
	const { id } = useParams()
	const { getSingleUserData, userRecipes, recipeUser, users, recipes } =
		useDatabase()
	const [userData, setUserData] = useState(null)
	const [uRecipes, setURecipes] = useState(null)

	useEffect(() => {
		const getData = async () => {
			const data = await getSingleUserData(id)
			if (data) {
				console.log(data)
				setUserData(data[1])
				setURecipes(data[0])
			} else if (data && data.length !== 0) {
				setUserData(recipeUser)
				setURecipes(userRecipes)
			} else {
				const u = users.filter(user => user._id.toString() === id)
				const r = recipes.filter(r => r.user === u[0]._id.toString())
				console.log(u)
				setUserData(u[0])
				setURecipes(r)
			}
		}
		getData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])

	return (
		<article>
			{userData && userData.length !== 0 && (
				<div className='w-full mx-auto text-center'>
					<div className='grid grid-cols-1  mb-8 md:gap-8 mx-auto'>
						{/* <div className='custom-card-image mb-6 md:mb-0'>
							<div className='rounded-lg shadow-xl card image-full'>
								<div className='card-body justify-end'>
									<h2 className='card-title mb-0'>{userData.username}</h2>
								</div>
							</div>
						</div> */}

						<div className='col-span-6'>
							<div className='mb-6'>
								<h1 className='text-3xl card-title'>{userData.username}</h1>
							</div>

							<div className='w-full rounded-lg shadow-md bg-base-100 stats'>
								{userData && (
									<div className='stat'>
										<div className='stat-title text-md'>
											Profile created:{' '}
											{userData.createdAt &&
												format(new Date(userData.createdAt), 'MMMM dd, yyyy')}
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats'>
						<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
							<div className='stat'>
								<div className='stat-figure text-secondary'>
									<FaUsers className='text-3xl md:text-5xl' />
								</div>
								<div className='stat-title pr-5'>Followers</div>
								<div className='stat-value pr-5 text-3xl md:text-4xl'>
									{followers}
								</div>
							</div>

							<div className='stat'>
								<div className='stat-figure text-secondary'>
									<FaUserFriends className='text-3xl md:text-5xl' />
								</div>
								<div className='stat-title pr-5'>Following</div>
								<div className='stat-value pr-5 text-3xl md:text-4xl'>
									{following}
								</div>
							</div>

							<div className='stat'>
								<div className='stat-figure text-secondary'>
									<FaCodepen className='text-3xl md:text-5xl' />
								</div>
								<div className='stat-title pr-5'>Public Repos</div>
								<div className='stat-value pr-5 text-3xl md:text-4xl'>
									{public_repos}
								</div>
							</div>

							<div className='stat'>
								<div className='stat-figure text-secondary'>
									<FaStore className='text-3xl md:text-5xl' />
								</div>
								<div className='stat-title pr-5'>Public Gists</div>
								<div className='stat-value pr-5 text-3xl md:text-4xl'>
									{public_gists}
								</div>
							</div>
						</div>
					</div> */}
					<Suspense fallback={<Loading />}>
						<section className='w-full'>
							<RecipeList recipes={uRecipes} />
						</section>
					</Suspense>
				</div>
			)}
		</article>
	)
}
export default SingleUser
