import axios from 'axios'
import {
	DELETE_USER_BY_ADMIN_FAIL,
	DELETE_USER_BY_ADMIN_REQUEST,
	DELETE_USER_BY_ADMIN_SUCCESS,
	FETCHING_USERS_BY_ADMIN_FAIL,
	FETCHING_USERS_BY_ADMIN_REQUEST,
	FETCHING_USERS_BY_ADMIN_SUCCESS,
	GET_USER_BY_ADMIN_REQUEST,
	GET_USER_BY_ADMIN_SUCCESS,
	UPDATE_USER_BY_ADMIN_REQUEST,
	UPDATE_USER_BY_ADMIN_SUCCESS,
} from '../constants/adminContants'

// GET USER PROFILE BY ADMIN
export const getUserProfileByAdmin = (id) => {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: GET_USER_BY_ADMIN_REQUEST,
			})
			const userInfo = getState().userLogin.userInfo
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.get(`/api/admin/users/${id}`, config)
			dispatch({
				type: GET_USER_BY_ADMIN_SUCCESS,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: GET_USER_BY_ADMIN_REQUEST,
				payload: error.message,
			})
		}
	}
}

// Update USER profile by Admin

export const updateUserByAdmin = (id, updatedData) => {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: UPDATE_USER_BY_ADMIN_REQUEST,
			})

			const userInfo = getState().userLogin.userInfo
			const config = {
				headers: {
					'Context-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.put(
				`/api/admin/users/${id}`,
				updatedData,
				config
			)

			dispatch({
				type: UPDATE_USER_BY_ADMIN_SUCCESS,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: UPDATE_USER_BY_ADMIN_REQUEST,
				payload: error.mesage,
			})
		}
	}
}

// GET user list by an admin)
export const getUserList = () => {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: FETCHING_USERS_BY_ADMIN_REQUEST,
			})

			const userInfo = getState().userLogin.userInfo
			const config = {
				headers: {
					'Context-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.get(`/api/admin/users/`, config)
			dispatch({
				type: FETCHING_USERS_BY_ADMIN_SUCCESS,
				payload: data,
			})
		} catch (error) {
			dispatch({
				type: FETCHING_USERS_BY_ADMIN_FAIL,
				payload: error.message,
			})
		}
	}
}

// DELETE an user by Admin
export const deleteUser = (id) => {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: DELETE_USER_BY_ADMIN_REQUEST,
			})

			// DELETE
			const userInfo = getState().userLogin.userInfo
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			}

			const { data } = await axios.delete(
				`/api/admin/users/${id}`,
				config
			)

			dispatch({
				type: DELETE_USER_BY_ADMIN_SUCCESS,
			})
		} catch (error) {
			dispatch({
				type: DELETE_USER_BY_ADMIN_FAIL,
				payload: error.message,
			})
		}
	}
}
