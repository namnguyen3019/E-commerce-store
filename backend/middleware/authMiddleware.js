import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

// Check if the token is correct
export const protect = asyncHandler(async function (req, res, next) {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1]
			const decoded = jwt.verify(token, process.env.JWT_SECRET)

			req.user = await User.findById(decoded.id).select('-password')
			next()
		} catch (error) {
			console.error(error)
			res.status(401)
			throw new Error(' Wrong email or password')
		}
	} else {
		res.status(401)
		throw new Error('Not authorized No token found')
	}
})

export const isAdmin = asyncHandler(async function (req, res, next) {
	const user = await User.findById(req.user._id)

	if (user && user.isAdmin) {
		next()
	} else {
		res.status(401)
		throw new Error(' Not authorized ')
	}
})
