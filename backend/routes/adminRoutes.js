import express from 'express'
import {
	deleteUserByAdmin,
	getUserByAdmin,
	getUsersByAdmin,
	updateUserByAdmin,
} from '../controllers/adminControllers.js'
import { isAdmin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/users').get(protect, isAdmin, getUsersByAdmin)
router
	.route('/users/:id')
	.get(protect, isAdmin, getUserByAdmin)
	.delete(protect, isAdmin, deleteUserByAdmin)
	.put(protect, isAdmin, updateUserByAdmin)

export default router
