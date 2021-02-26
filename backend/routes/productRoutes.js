import express from 'express'
import {
	createProduct,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct,
} from '../controllers/productControllers.js'
import { isAdmin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, isAdmin, createProduct)

router
	.route('/:id')
	.get(getProductById)
	.delete(protect, isAdmin, deleteProduct)
	.put(protect, isAdmin, updateProduct)

export default router
