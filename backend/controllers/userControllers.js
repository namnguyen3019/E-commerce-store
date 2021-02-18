import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc Auth user & get token
// @route POST api/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email: email })

	if (user) {
		// Compare password method
		if (await user.matchPassword(password)) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				token: generateToken(user._id),
			})
		} else {
			res.status(401)
			throw new Error(' Wrong password')
		}
	} else {
		res.status(401)
		throw new Error('User not found')
	}
})

// @desc Register a new User
// @route Post /api/user
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const existUser = await User.findOne({ email })

	if (existUser) {
		res.status(400)
		throw new Error('User already exists')
	}

	const user = await User.create({
		name,
		email,
		password,
	})

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		})
	} else {
		res.json(400)
		throw new Error('invalid')
	}
})

// @desc Get User Profile
// @route get api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
	const user = req.user

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(401)
		throw new Error('User not found')
	}
})

// @desc Update User Profile
// @route PUT api/users/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		if (req.body.password) {
			user.password = req.body.password
		}

		const updatedUser = await user.save()
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			token: generateToken(updatedUser._id),
		})
	} else {
		res.status(401)
		throw new Error('User not found')
	}
})