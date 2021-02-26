import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
// Admin

// @desc Get all users by admin
// @route GET api/users/
// @access Public/Admin
export const getUsersByAdmin = asyncHandler(async (req, res) => {
	const users = await User.find({})

	if (users) {
		res.json(users)
	} else {
		res.status(401)
		throw new Error('not authorized')
	}
})

// @desc Get an user profile by Admin
// @route get api/users/:id
// @access Public/Admin
export const getUserByAdmin = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)

	if (user) {
		res.json(user)
	} else {
		res.status(400)
		throw new Error('Not found')
	}
})

// @desc Delete an user by ADMIN
// @route Delete api/users/:id
// @access Public/Admin
export const deleteUserByAdmin = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)

	if (user) {
		await user.remove()
		res.json({ message: 'User removed' })
	} else {
		res.status(400)
		throw new Error('Not found')
	}
})

// @desc Update an user profile by ADMIN
// @route put api/users/:id
// @access Public/Admin
export const updateUserByAdmin = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		user.isAdmin = req.body.isAdmin

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			email: updatedUser.email,
			name: updatedUser.name,
			isAdmin: updatedUser.isAdmin,
		})
	} else {
		res.status(400)
		throw new Error('Not found')
	}
})
