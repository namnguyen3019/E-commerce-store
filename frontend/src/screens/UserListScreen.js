import React, { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, getUserList } from '../actions/userActions'

const UserListScreen = () => {
	const user = useSelector((state) => state.userDetails.user)
	const userList = useSelector((state) => state.userList)
	const { loading, userList: allUsers, success } = userList
	const dispatch = useDispatch()

	useEffect(() => {
		if (Object.keys(user).length === 0) {
			dispatch(getUserDetails('profile'))
		} else {
			dispatch(getUserList())
		}
	}, [user, dispatch])
	return (
		<div>
			<h2>{user.isAdmin ? 'Admin' : 'Not admin'}</h2>
			<ListGroup>
				{success
					? allUsers.map((user, index) => {
							return (
								<ListGroup.Item key={index}>
									{user.name}
								</ListGroup.Item>
							)
					  })
					: null}
			</ListGroup>
		</div>
	)
}

export default UserListScreen
