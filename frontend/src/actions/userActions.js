import axios from 'axios'
import {
	USER_DELETE_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userContants'

export const login = (email, password) => {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: USER_LOGIN_REQUEST,
			})
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			}

			const { data } = await axios.post(
				'/api/users/login',
				{ email, password },
				config
			)
			console.log(data)
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data,
			})

			localStorage.setItem('userInfo', JSON.stringify(data))
		} catch (error) {
			dispatch({
				type: USER_LOGIN_FAIL,
				payload: error.message,
			})
		}
	}
}

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo')

	dispatch({
		type: USER_LOGOUT,
	})
}

// User register action

export const register = (name, email, password) => {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: USER_REGISTER_REQUEST,
			})

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			const { data } = await axios.post(
				'/api/users/register',
				{ name, email, password },
				config
			)

			dispatch({
				type: USER_REGISTER_SUCCESS,
				payload: data,
			})

			// login after success register
			const { loginData } = await axios.post(
				'/api/users/login',
				{ email, password },
				config
			)

			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: loginData,
			})

			localStorage.setItem('userInfo', JSON.stringify(loginData))
		} catch (error) {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: error.message,
			})
		}
	}
}

// GET user profile
export const getUserDetails = (id) => {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: USER_DETAILS_REQUEST,
			})
			const userInfo = getState().userLogin.userInfo

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}
			const { data } = await axios.get(`/api/users/${id}`, config)

			dispatch({
				type: USER_DETAILS_SUCCESS,
				payload: data,
			})

			localStorage.setItem('userDetails', JSON.stringify(data))
		} catch (error) {
			dispatch({
				type: USER_DETAILS_FAIL,
				payload: error.message,
			})
		}
	}
}

// UPDATE User Profile
export const updateUserProfile = (user) =>
	async function (dispatch, getState) {
		try {
			dispatch({
				type: USER_UPDATE_PROFILE_REQUEST,
			})

			const userInfo = getState().userLogin.userInfo

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.put('/api/users/profile', user, config)
			dispatch({
				type: USER_UPDATE_PROFILE_SUCCESS,
				payload: data,
			})

			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data,
			})
			console.log(data)
			localStorage.setItem('userInfo', JSON.stringify(data))
		} catch (error) {
			dispatch({
				type: USER_UPDATE_PROFILE_FAIL,
				payload: error.message,
			})
		}
	}

// GET user list (as an admin)

export const getUserList = () => {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: USER_LIST_REQUEST,
			})

			const userInfo = getState().userLogin.userInfo
			const config = {
				headers: {
					'Context-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.get(`/api/users/`, config)
			dispatch({
				type: USER_LIST_SUCCESS,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: USER_LIST_FAIL,
				payload: error.message,
			})
		}
	}
}

// DELETE an user

export const deleteUser = (id) => {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: USER_DELETE_REQUEST,
			})

			// DELETE
			const userInfo = getState().userLogin.userInfo
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.delete(`/api/users/${id}`, config)

			dispatch({
				type: USER_DELETE_SUCCESS,
			})
		} catch (error) {
			dispatch({
				type: USER_DELETE_FAIL,
				payload: error.message,
			})
		}
	}
}
