import RecipeCard from './RecipeCard'

function RecipeList({ recipes }) {
	return (
		<article className='mx-auto py-2 px-4 w-full'>
			<div className='flex flex-row flex-wrap justify-center md:justify-around lg:justify-center items-stretch w-full'>
				{recipes &&
					recipes.length !== 0 &&
					recipes.map(recipe => (
						<div
							key={recipe._id}
							className='w-full md:w-1/3 md:m-1 lg:w-1/4 lg:m-3  p-1'
						>
							<RecipeCard recipe={recipe} />
						</div>
					))}
			</div>
		</article>
	)
}
export default RecipeList
