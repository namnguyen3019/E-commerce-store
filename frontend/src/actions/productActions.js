import axios from 'axios'
import {
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_TOP_FAIL,
	PRODUCT_TOP_REQUEST,
	PRODUCT_TOP_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants.js'

// FETCHING all products
export const listProducts = (keyword = '', pageNumber = '') => async (
	dispatch
) => {
	try {
		dispatch({
			type: PRODUCT_LIST_REQUEST,
		})

		const { data } = await axios.get(
			`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
		)
		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		})

		localStorage.setItem('productList', JSON.stringify(data))
	} catch (err) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload: err.message,
		})
	}
}
// GET TOP products
export const listTopProducts = () => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_TOP_REQUEST,
		})

		const { data } = await axios.get(`/api/products/top`)
		dispatch({
			type: PRODUCT_TOP_SUCCESS,
			payload: data,
		})

		localStorage.setItem('topProducts', JSON.stringify(data))
	} catch (err) {
		dispatch({
			type: PRODUCT_TOP_FAIL,
			payload: err.message,
		})
	}
}
// Fetching a product details
export const listProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_DETAILS_REQUEST,
		})

		const { data } = await axios.get(`/api/products/${id}`)
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (err) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload: err.message,
		})
	}
}

// Delete a product

export const deleteProduct = (id) => {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: PRODUCT_DELETE_REQUEST,
			})
			const userInfo = getState().userLogin.userInfo
			const config = {
				headers: {
					'Context-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}
			const { data } = await axios.delete(`/api/products/${id}`, config)
			dispatch({
				type: PRODUCT_DELETE_SUCCESS,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: PRODUCT_DELETE_FAIL,
				payload: error.message,
			})
		}
	}
}

// Create a product
export const createProduct = () => {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: PRODUCT_CREATE_REQUEST,
			})
			const userInfo = getState().userLogin.userInfo
			const config = {
				headers: {
					'Context-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}
			const { data } = await axios.post(`/api/products/`, {}, config)

			dispatch({
				type: PRODUCT_CREATE_SUCCESS,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: PRODUCT_CREATE_FAIL,
				payload: error.message,
			})
		}
	}
}

// UPDATE a product
export const updateProduct = (id, product) => {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: PRODUCT_UPDATE_REQUEST,
			})
			const userInfo = getState().userLogin.userInfo
			const config = {
				headers: {
					'Context-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}
			const { data } = await axios.put(
				`/api/products/${id}`,
				product,
				config
			)

			dispatch({
				type: PRODUCT_UPDATE_SUCCESS,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: PRODUCT_UPDATE_FAIL,
				payload: error.message,
			})
		}
	}
}

// UPDATE a product
export const createProductReview = (productId, review) => {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: PRODUCT_CREATE_REVIEW_REQUEST,
			})
			const userInfo = getState().userLogin.userInfo
			const config = {
				headers: {
					'Context-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}
			await axios.post(
				`/api/products/${productId}/reviews`,
				review,
				config
			)

			dispatch({
				type: PRODUCT_CREATE_REVIEW_SUCCESS,
			})
		} catch (error) {
			dispatch({
				type: PRODUCT_CREATE_REVIEW_FAIL,
				payload: error.message,
			})
		}
	}
}
