import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
	{
		username: {
			type: String,
		},
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		birthday: {
			type: Date,
		},
		email: {
			type: String,
			required: [true, 'Please add email'],
			unique: true,
		},
		password: {
			type: String,
		},
		theme: {
			type: String,
			default: '#58249c',
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
			required: true,
		},
		favourites: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Recipe',
				required: true,
			},
		],
	},
	{
		timestamps: true,
	}
)

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
