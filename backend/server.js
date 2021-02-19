import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import orderRoutes from './routes/orderRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('API is running')
})

// Product Routes
app.use('/api/products', productRoutes)
// User Routes
app.use('/api/users', userRoutes)
// Order Routes
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
)
const PORT = process.env.PORT || 5000
app.listen(
	PORT,
	console.log(`server running in ${process.env.NODE_ENV} on port, ${PORT}`)
)
