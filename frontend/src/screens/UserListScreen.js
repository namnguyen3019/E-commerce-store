import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser, getUserList } from '../actions/adminActions'
const UserListScreen = ({ history }) => {
	const userInfo = useSelector((state) => state.userLogin.userInfo)
	const userList = useSelector((state) => state.userList)
	const { loading, userList: allUsers, success } = userList
	const userDelete = useSelector((state) => state.userDelete)
	const {
		loading: loadingDeteleUser,
		success: successDeleteUser,
		error: errorDeleteUser,
	} = userDelete
	const dispatch = useDispatch()
	console.log(userList)
	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			if (!loadingDeteleUser) {
				dispatch(getUserList())
			}
		} else {
			history.push('/')
		}
	}, [dispatch, userInfo, successDeleteUser, history])

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure')) {
			dispatch(deleteUser(id))
		}
	}
	return (
		<div>
			<h2>{userInfo && userInfo.isAdmin ? 'Admin' : 'Not admin'}</h2>
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
									<td>{user._id}</td>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.isAdmin ? 'admin' : null}</td>
									<td className="mx-auto">
										<Link
											exact
											to={`/users/userlist/${user._id}`}
										>
											<Button className="mx-2">
												Edit
											</Button>
										</Link>
										<Button
											onClick={() =>
												deleteHandler(user._id)
											}
											className="mx-2"
											variant="danger"
										>
											Delete
										</Button>
									</td>
								</tr>
							)
						})}
				</tbody>
			</Table>
		</div>
	)
}

export default UserListScreen
