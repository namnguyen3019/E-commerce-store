import {
	DELETE_USER_BY_ADMIN_FAIL,
	DELETE_USER_BY_ADMIN_REQUEST,
	DELETE_USER_BY_ADMIN_RESET,
	DELETE_USER_BY_ADMIN_SUCCESS,
	FETCHING_USERS_BY_ADMIN_FAIL,
	FETCHING_USERS_BY_ADMIN_REQUEST,
	FETCHING_USERS_BY_ADMIN_SUCCESS,
	GET_USER_BY_ADMIN_FAIL,
	GET_USER_BY_ADMIN_REQUEST,
	GET_USER_BY_ADMIN_SUCCESS,
	UPDATE_USER_BY_ADMIN_FAIL,
	UPDATE_USER_BY_ADMIN_REQUEST,
	UPDATE_USER_BY_ADMIN_RESET,
	UPDATE_USER_BY_ADMIN_SUCCESS,
} from '../constants/adminContants.js'
import {
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_RESET,
	USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userContants.js'

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return {
				loading: true,
			}
		case USER_LOGIN_SUCCESS:
			return {
				loading: false,
				userInfo: action.payload,
			}
		case USER_LOGIN_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case USER_LOGOUT:
			return {}
		default:
			return state
	}
}

// Register reducer
export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return {
				loading: true,
			}
		case USER_REGISTER_SUCCESS:
			return {
				loading: false,
				userInfo: action.payload,
			}
		case USER_REGISTER_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

// GET user detail

export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			}
		case USER_DETAILS_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			}
		case USER_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

// UPDATE user
export const userUpdateProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UPDATE_PROFILE_REQUEST:
			return {
				...state,
				loading: true,
			}
		case USER_UPDATE_PROFILE_SUCCESS:
			return {
				loading: false,
				user: action.payload,
				success: true,
			}
		case USER_UPDATE_PROFILE_FAIL:
			return {
				loading: false,
				error: action.payload,
				success: false,
			}
		case USER_UPDATE_PROFILE_RESET:
			return {}
		default:
			return state
	}
}

// Get user list ( as an admin)

export const userListReducer = (state = { userList: [] }, action) => {
	switch (action.type) {
		case FETCHING_USERS_BY_ADMIN_REQUEST:
			return {
				loading: true,
			}
		case FETCHING_USERS_BY_ADMIN_SUCCESS:
			return {
				loading: false,
				success: true,
				userList: action.payload,
			}
		case FETCHING_USERS_BY_ADMIN_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}

// DELETE a user
export const userDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_USER_BY_ADMIN_REQUEST:
			return {
				loading: true,
			}
		case DELETE_USER_BY_ADMIN_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case DELETE_USER_BY_ADMIN_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			}
		case DELETE_USER_BY_ADMIN_RESET:
			return {}
		default:
			return state
	}
}

// Get user profile by Admin
export const userProfileByAdminReducer = (
	state = { loading: true, userProfile: {} },
	action
) => {
	switch (action.type) {
		case GET_USER_BY_ADMIN_REQUEST:
			return {
				loading: true,
			}
		case GET_USER_BY_ADMIN_SUCCESS:
			return {
				loading: false,
				success: true,
				userProfile: action.payload,
			}
		case GET_USER_BY_ADMIN_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			}
		default:
			return state
	}
}

// UPDATE user by Admin
export const userUpdateByAdminReducer = (
	state = { loading: true, updatedUser: {} },
	action
) => {
	switch (action.type) {
		case UPDATE_USER_BY_ADMIN_REQUEST:
			return {
				loading: true,
			}
		case UPDATE_USER_BY_ADMIN_SUCCESS:
			return {
				loading: false,
				success: true,
				updatedUser: action.payload,
			}
		case UPDATE_USER_BY_ADMIN_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			}
		case UPDATE_USER_BY_ADMIN_RESET:
			return {}
		default:
			return state
	}
}
