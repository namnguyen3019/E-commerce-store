import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import connectDB from './config/db.js'
import adminRoutes from './routes/adminRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import userRoutes from './routes/userRoutes.js'
dotenv.config()

connectDB()

const app = express()

app.use(express.json())

// Product Routes
app.use('/api/products', productRoutes)
// User Routes
app.use('/api/users', userRoutes)
// Admin Routes
app.use('/api/admin', adminRoutes)
// Order Routes
app.use('/api/orders', orderRoutes)
// Update Routes
app.use('/api/uploads', uploadRoutes)

// Palpal config
app.get('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
)

// Make uploads folder static
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')))
	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	)
} else {
	app.get('/', (req, res) => {
		res.send('API is running')
	})
}
const PORT = process.env.PORT || 5000
app.listen(
	PORT,
	console.log(`server running in ${process.env.NODE_ENV} on port, ${PORT}`)
)
