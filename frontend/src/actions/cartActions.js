import axios from 'axios'
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_RESET_ITEMS,
	CART_SAVING_PAYMENT_METHOD,
	CART_SAVING_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

export const addToCart = (id, qty) => {
	return async function (dispatch, getState) {
		const { data } = await axios.get(`/api/products/${id}`)

		dispatch({
			type: CART_ADD_ITEM,
			payload: {
				product: data._id,
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
				qty,
			},
		})

		localStorage.setItem(
			'cartItems',
			JSON.stringify(getState().cart.cartItems)
		)
	}
}

export const removeFromCart = (id) => {
	return function (dispatch, getState) {
		dispatch({
			type: CART_REMOVE_ITEM,
			payload: id,
		})

		localStorage.setItem(
			'cartItems',
			JSON.stringify(getState().cart.cartItems)
		)
	}
}

// Saving shipping address
export const savingShippingAddress = (shippingAddress) => {
	return function (dispatch, getState) {
		dispatch({
			type: CART_SAVING_SHIPPING_ADDRESS,
			payload: shippingAddress,
		})

		localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress))
	}
}

// Saving Payment Method
export const savingPaymentMethod = (paymentMethod) => {
	return function (dispatch, getState) {
		dispatch({
			type: CART_SAVING_PAYMENT_METHOD,
			payload: paymentMethod,
		})

		localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
	}
}

export const resetCart = () => {
	return function (dispatch, getState) {
		dispatch({
			type: CART_RESET_ITEMS,
		})

		localStorage.setItem('cart', JSON.stringify({}))
	}
}
