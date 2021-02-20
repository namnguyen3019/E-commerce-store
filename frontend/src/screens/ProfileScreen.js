import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrders } from '../actions/orderActions'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import MyOders from '../components/MyOders'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userContants'
const ProfileScreen = ({ history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmedPassword, setConfirmedPassword] = useState('')

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success } = userUpdateProfile

	const orderList = useSelector((state) => state.orderList)
	console.log(orderList)
	const {
		loading: loadingOrderList,
		success: loadingOrderListSuccess,
		error: loadingOrderListError,
		allOrders,
	} = orderList
	const dispatch = useDispatch()

	// UPDATE users Profile
	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		} else {
			if (!user || !user.name || success) {
				dispatch({
					type: USER_UPDATE_PROFILE_RESET,
				})
				dispatch(getUserDetails('profile'))
			} else {
				setName(user.name)
				setEmail(user.email)
			}
		}
	}, [userInfo, history, user, dispatch, success])

	// Fetching all orders
	useEffect(() => {
		if (!loadingOrderListSuccess && !loadingOrderListError) {
			dispatch(getMyOrders())
		}
	}, [dispatch, orderList])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateUserProfile({
				name: name,
				email: email,
			})
		)
	}
	return (
		<Container>
			<Row>
				<Col sm={12} md={3}>
					{success && (
						<Message variant="success"> Profile Updated </Message>
					)}
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
						<Form.Group controlId="password">
							<Form.Control
								type="password"
								placeholder="Enter password"
							></Form.Control>
						</Form.Group>

						<Form.Group controlId="confirmedPassword">
							<Form.Control
								type="password"
								placeholder="Comfirmed password"
							></Form.Control>
						</Form.Group>

						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				</Col>
				<Col sm={12} md={9}>
					<h3>My Orders</h3>
					{loadingOrderList ? (
						<Loader />
					) : !loadingOrderListSuccess ? (
						<Message>Empty</Message>
					) : (
						<MyOders orderList={allOrders} />
					)}
				</Col>
			</Row>
		</Container>
	)
}

export default ProfileScreen
