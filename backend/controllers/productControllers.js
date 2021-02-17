import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc Fetching all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({})
	res.json(products)
})

// @desc Fetching 1 single product
// @route GET /api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		res.json(product)
	} else {
		res.status(404).json({ message: 'Product not found' })
	}
})
