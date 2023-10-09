//import mongoose
import mongoose from 'mongoose'

let isConnected = false
//function to connect to db
export const connectDB = async () => {
	if (isConnected) {
		console.log('Database is already connected')
		return
	}
	try {
		//connect to DB
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		isConnected = true
		console.log(`MongoDB connected.`)
	} catch (error) {
		console.log(`Error: ${error.message}`)
		//exit process with failure
		process.exit(1)
	}
}
