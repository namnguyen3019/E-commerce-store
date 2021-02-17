import axios from 'axios'
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
} from '../constants/userLoginConstants'

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

// User regiester action

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
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data,
			})

			localStorage.setItem('userInfo', JSON.stringify(data))
		} catch (error) {
			dispatch({
				type: USER_REGISTER_FAIL,
				payload: error.message,
			})
		}
	}
}
