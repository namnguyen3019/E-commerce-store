import axios from 'axios'
import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_FETCH_REQUEST,
	ORDER_FETCH_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
} from '../constants/orderContants'
// Create order

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		})
		const userInfo = getState().userLogin.userInfo

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// CREATE order
		const { data } = await axios.post('/api/orders', order, config)
		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: error.message,
		})
	}
}

// Get A order from database
export const getOrderById = (id) => {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: ORDER_FETCH_REQUEST,
			})
			const userInfo = getState().userLogin.userInfo

			const config = {
				headers: {
					'Context-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.get(`/api/orders/${id}`, config)
			dispatch({
				type: ORDER_FETCH_SUCCESS,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: ORDER_FETCH_SUCCESS,
				payload: error.message,
			})
		}
	}
}

// FETCHING all ORDER from DB for an user

export const getMyOrders = () => {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: ORDER_LIST_REQUEST,
			})

			const userInfo = getState().userLogin.userInfo

			const config = {
				headers: {
					'Context-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.get('/api/orders/myorders', config)

			dispatch({
				type: ORDER_LIST_SUCCESS,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: ORDER_LIST_FAIL,
				payload: error.message,
			})
		}
	}
}

// Update order to paid

export const payOrder = (orderId, paymentResult) => {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: ORDER_PAY_REQUEST,
			})
			const userInfo = getState().userLogin.userInfo
			const config = {
				headers: {
					'Context-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.put(
				`/api/orders/${orderId}/pay`,
				paymentResult,
				config
			)
			dispatch({
				type: ORDER_PAY_SUCCESS,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: ORDER_PAY_FAIL,
				payload: error.message,
			})
		}
	}
}
