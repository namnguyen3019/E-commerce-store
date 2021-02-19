import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_FETCH_FAIL,
	ORDER_FETCH_REQUEST,
	ORDER_FETCH_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_RESET,
	ORDER_PAY_SUCCESS,
} from '../constants/orderContants'

// CREATE a new ORDER
export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return {
				loading: true,
			}
		case ORDER_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				order: action.payload,
			}
		case ORDER_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

// Get/Fetch a order
export const orderDetailsReducer = (state = { loading: true }, action) => {
	switch (action.type) {
		case ORDER_FETCH_REQUEST:
			return {
				...state,
				loading: true,
			}
		case ORDER_FETCH_SUCCESS:
			return {
				loading: false,
				success: true,
				order: action.payload,
			}
		case ORDER_FETCH_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

// GET all Orders
export const orderListReducer = (state = [], action) => {
	switch (action.type) {
		case ORDER_LIST_REQUEST:
			return {
				...state,
				loading: true,
			}
		case ORDER_LIST_SUCCESS:
			return {
				loading: false,
				success: true,
				allOrders: action.payload,
			}
		case ORDER_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

// Order Update
export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return {
				loading: true,
			}
		case ORDER_PAY_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case ORDER_PAY_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case ORDER_PAY_RESET:
			return {}
		default:
			return state
	}
}
