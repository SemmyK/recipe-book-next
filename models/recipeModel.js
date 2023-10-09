import mongoose from 'mongoose'

const RecipeSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Please add title'],
		},
		cookingTime: {
			type: String,
			required: [true, 'Please add cooking time'],
		},
		method: {
			type: String,
			required: [true, 'Please add cooking method'],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		type: {
			type: String,
			enum: [
				'meal',
				'soup',
				'salad',
				'smoothie',
				'snack',
				'sauce',
				'side',
				'dessert',
			],
			default: 'meal',
			required: [true, 'Please select a type for a recipe.'],
		},
		ingredients: [
			{
				type: String,
				required: [true, 'Please provide at least one ingredient.'],
			},
		],
	},
	{
		timestamps: true,
	}
)

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema)

export default Recipe
