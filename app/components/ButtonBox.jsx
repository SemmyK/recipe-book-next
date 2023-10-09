import { useDatabase } from '@app/hooks/useDatabase'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

function ButtonBox({ recipe, text, recipeUser }) {
	const router = useRouter()
	const { data: session } = useSession()
	const { user: currentUser, getUsersAndRecipes } = useDatabase()
	const user = session?.user

	const handleDelete = async () => {
		try {
			if (currentUser._id === recipeUser) {
				await fetch(`/api/recipes/${recipe?._id.toString()}`, {
					method: 'DELETE',
				})

				getUsersAndRecipes()

				toast.info('Successfully deleted recipe from database.')
			}
		} catch (error) {
			console.log(error)
			toast.error('Failed to delete recipe.')
		}
	}

	const handleClick = async e => {
		if (e.target.innerText === 'Cook this') {
			router.push(`/recipes/${recipe?._id}`)
		} else {
			router.push('/')
		}
	}

	return (
		<div className='flex flex-col justify-around items-center py-4'>
			<div>
				<button
					onClick={handleClick}
					className='rounded-full hover:rounded-xl bg-violet-700 dark:bg-neutral-800 dark:text-slate-200 dark:font-bold text-white py-2 px-4 my-2'
				>
					{text}
				</button>
			</div>

			{user && recipeUser === currentUser?._id && (
				<div className='flex flex-row justify-between items-center'>
					<Link href={`/recipes/update/${recipe?._id}`}>
						<button className='rounded-full hover:rounded-xl bg-violet-700 text-white py-2 px-4 m-2 dark:bg-neutral-800 dark:text-slate-200 dark:font-bold'>
							Edit
						</button>
					</Link>

					<button
						className='rounded-full hover:rounded-xl bg-violet-700 text-white py-2 px-4 m-2 dark:bg-neutral-800 dark:text-slate-200 dark:font-bold'
						onClick={() => handleDelete(recipe._id)}
					>
						Delete
					</button>
				</div>
			)}
		</div>
	)
}
export default ButtonBox
