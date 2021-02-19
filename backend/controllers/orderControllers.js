import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc Create new order
// @route POST /api/orders
// @access private

export const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body

	if (orderItems && orderItems.length === 0) {
		res.status(400)
		throw new Error('No items in the cart')
		return
	} else {
		const order = new Order({
			user: req.user._id,
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		})

		const createdOrder = await order.save()

		res.status(201).json(createdOrder)
	}
})

// @desc GET order detail
// @route GET api/orders/:id
// @access private

export const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	)

	if (order) {
		res.json({
			...order._doc,
		})
	} else {
		res.status(400)
		throw new Error(' Order not found')
	}
})

// @desc GET ALL ORDERS from a user
// @route get api/orders/
// @access private

export const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id })

	if (orders) {
		res.json(orders)
	} else {
		res.status(400)
		throw new Error('No orders found')
	}
})

// @desc UPDATE ORDER to paid
// @route Put api/orders/:id/pay
// @access private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		;(order.isPaid = true),
			(order.paidAt = Date.now()),
			(order.paymentResult = {
				id: req.body.id,
				status: req.body.status,
				update_time: req.body.update_time,
				email_address: req.body.payer.email_address,
			})

		const updatedOrder = order.save()
		res.json(updatedOrder)
	} else {
		res.status(400)
		throw new Error(' Order not found')
	}
})
