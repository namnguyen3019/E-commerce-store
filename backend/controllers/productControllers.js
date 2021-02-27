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

// @desc Delete a single product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		await product.remove()
		res.json({ message: 'Product Removed' })
	} else {
		res.status(404).json({ message: 'Product not found' })
	}
})

// @desc Create a single product
// @route POST /api/products/:id
// @access Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample brand',
		category: ' Sample category',
		countInStock: 0,
		nuwReviews: 0,
		description: 'Sample description',
	})

	const createdProduct = await product.save()
	res.status(201).json(createdProduct)
})

// @desc UPDATE a product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
		nuwReviews,
	} = req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		product.name = name || product.name
		product.price = price || product.price
		product.description = description || product.description
		product.image = image || product.image
		product.brand = brand || product.brand
		product.nuwReviews = nuwReviews || product.nuwReviews
		product.category = category || product.category
		product.countInStock = countInStock || product.countInStock

		const updatedProduct = await product.save()
		res.status(201).json(updatedProduct)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

// @desc CREATE new review
// @route POST /api/products/:id/reviews
// @access Private/user
export const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		)
		if (alreadyReviewed) {
			res.status(400)
			throw new Error('Product already review')
		} else {
			const review = {
				name: req.user.name,
				rating: Number(rating),
				comment,
				user: req.user._id,
			}
			product.reviews.push(review)
			product.numReviews = product.reviews.length

			product.rating =
				product.reviews.reduce((acc, item) => item.rating + acc, 0) /
				product.reviews.length

			await product.save()

			res.status(201).json({ message: ' Product reviewed' })
		}
	} else {
		res.status(400)

		throw new Error('Product not found')
	}
})
