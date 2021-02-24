import express from 'express'
import {
	authUser,
	deleteUser,
	getUserProfile,
	getUsers,
	registerUser,
	updateUserProfile,
} from '../controllers/userControllers.js'
import { isAdmin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(protect, isAdmin, getUsers)
router.route('/:id').delete(protect, isAdmin, deleteUser)

router.route('/register').post(registerUser)
router.post('/login', authUser)
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)
export default router
