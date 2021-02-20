import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, getUserList } from '../actions/userActions'
const UserListScreen = () => {
	const user = useSelector((state) => state.userDetails.user)
	const userList = useSelector((state) => state.userList)
	const { loading, userList: allUsers, success } = userList
	const dispatch = useDispatch()
	console.log(userList)
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
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email </th>
						<th>Admin</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{success &&
						allUsers &&
						allUsers.map((user) => {
							console.log(user)
							return (
								<tr key={user._id}>
									<td>{user._id.substring(0, 5)}</td>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.isAdmin.tostring}</td>
									<td> Delete or Edit</td>
								</tr>
							)
						})}
				</tbody>
			</Table>
		</div>
	)
}

export default UserListScreen
