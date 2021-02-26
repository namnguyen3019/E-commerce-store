import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
	getUserProfileByAdmin,
	updateUserByAdmin,
} from '../actions/adminActions'
import Message from '../components/Message'
import { UPDATE_USER_BY_ADMIN_RESET } from '../constants/adminContants'

const EditUserProfileScreen = ({ match, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)

	const userProfileByAdmin = useSelector((state) => state.userProfileByAdmin)
	const {
		loading,
		success: getUserProfileSuccess,
		error,
		userProfile,
	} = userProfileByAdmin

	const userUpdateByAdmin = useSelector((state) => state.userUpdateByAdmin)
	const {
		loading: updateUserLoading,
		success: updateUserSucces,
		error: updateUserError,
		updatedUser,
	} = userUpdateByAdmin

	const userInfo = useSelector((state) => state.userLogin.userInfo)
	const dispatch = useDispatch()
	useEffect(() => {
		if (!userInfo || !userInfo.isAdmin) {
			history.push('/')
		} else {
			if (updateUserSucces) {
				dispatch({
					type: UPDATE_USER_BY_ADMIN_RESET,
				})
				history.push('/')
			} else {
				if (!userProfile || userProfile._id !== match.params.id) {
					dispatch(getUserProfileByAdmin(match.params.id))

					console.log(' get user profile request ')
				} else {
					setName(userProfile.name)
					setEmail(userProfile.email)
					setIsAdmin(userProfile.isAdmin)
				}
			}
		}
	}, [dispatch, history, match.params.id, updateUserSucces, userProfile])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateUserByAdmin(userProfile._id, {
				name,
				email,
				isAdmin,
			})
		)
	}
	return (
		<>
			<Form onSubmit={submitHandler}>
				<h4> Your Name </h4>

				<Form.Group controlId="name">
					<Form.Control
						type="text"
						placeholder={name}
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<h4>Your infor</h4>
				<Form.Group controlId="email">
					<Form.Control
						type="email"
						placeholder={email}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				{updateUserSucces && <Message> User Updated ! </Message>}
				<Button onClick={submitHandler}>Update</Button>
			</Form>
		</>
	)
}

export default EditUserProfileScreen
