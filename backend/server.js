import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
	res.send('API is running')
})

// Product Routes
app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000
app.listen(
	PORT,
	console.log(`server running in ${process.env.NODE_ENV} on port, ${PORT}`)
)
