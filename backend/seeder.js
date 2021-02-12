import dotenv from 'dotenv'
import connectDB from './config/db.js'
import products from './data/products.js'
import users from './data/users.js'
import Order from './models/orderModel.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'

dotenv.config()
connectDB()

const importData = async () => {
	try {
		// Delte all collection in database first
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		// Add users in database
		const createdUsers = await User.insertMany(users)
		const adminUser = createdUsers[0]._id

		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser }
		})

		await Product.insertMany(sampleProducts)

		console.log('Data imported ')
		process.exit()
	} catch (error) {
		console.log(`${error.message}`)
		process.exit(1)
	}
}

const destroyData = async () => {
	try {
		// Delte all collection in database first
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()
		console.log('Delete data')
	} catch (error) {
		console.log(`${error.message}`)
		process.exit(1)
	}
}

if (process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}
