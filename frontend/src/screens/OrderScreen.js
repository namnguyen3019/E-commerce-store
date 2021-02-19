import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Image, ListGroup, Row } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById, payOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ORDER_PAY_RESET } from '../constants/orderContants'
const OrderScreen = ({ history, match }) => {
	const orderId = match.params.id
	const [sdkReady, setSdkReady] = useState(false)
	const orderDetails = useSelector((state) => state.orderDetails)
	const { error, loading, success, order } = orderDetails

	const orderPay = useSelector((state) => state.orderPay)
	const { loading: loadingPay, success: successPay } = orderPay

	const userInfo = useSelector((state) => state.userLogin.userInfo)

	const dispatch = useDispatch()

	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		} else {
			// Create Paypal Script
			const addPayPalScript = async () => {
				const { data: clientId } = await axios.get('/api/config/paypal')
				const script = document.createElement('script')
				script.type = 'text/javascript'
				script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
				script.async = true
				script.onload = () => {
					setSdkReady(true)
				}
				document.body.appendChild(script)
			}
			// Dispatch getOrderById when order not there OR successPay
			if (!order || order._id !== orderId || successPay) {
				dispatch({ type: ORDER_PAY_RESET })
				dispatch(getOrderById(orderId))
			} else if (!order.isPaid) {
				if (!window.paypal) {
					addPayPalScript()
				} else {
					setSdkReady(true)
				}
			}
		}
	}, [dispatch, orderId, order, successPay, userInfo])

	// Pay handler
	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult)
		dispatch(payOrder(orderId, paymentResult))
	}
	return (
		<>
			{loading ? (
				<Loader>Loading...</Loader>
			) : error ? (
				<Message>Error</Message>
			) : (
				<>
					<h3> Order Summary {orderId} </h3>
					<Row>
						<Col md={8}>
							<ListGroup>
								{/* Shipping details */}
								<ListGroup.Item>
									<h4> Shipping </h4>
									<p>{`Name: ${order.user.name}`}</p>
									<p>{`Email: ${order.user.email}`}</p>
									<p>{`Address: ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country}, ${order.shippingAddress.postalCode}`}</p>
									<p>
										Shipping Status:{' '}
										{order.isDelivered
											? 'Delivered'
											: 'Not Delivered'}{' '}
									</p>
								</ListGroup.Item>
								{/* Payment details */}
								<ListGroup.Item>
									<h4> Payment </h4>
									<p>{`Method: ${order.paymentMethod}`}</p>
									<p>
										Status:{' '}
										{order.isPaid
											? `Paid at ${order.paidAt}`
											: 'Not Paid'}{' '}
									</p>
								</ListGroup.Item>
								{/* Oder Items  */}
								<ListGroup.Item>
									<h4> Order Items </h4>
									{order.orderItems.map((item, index) => {
										return (
											<Row key={index}>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														roundedCircle
													/>
												</Col>
												<Col md={5}>{`${index + 1}. ${
													item.name
												}`}</Col>
												<Col md={6}>{`$${item.price}x${
													item.qty
												} = $${(
													item.price * item.qty
												).toFixed(2)}`}</Col>
											</Row>
										)
									})}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={4}>
							<ListGroup>
								<ListGroup.Item className="text-center">
									{' '}
									<h3>Order summary</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col md={6}>Items Price:</Col>
										<Col md={6}>${order.itemsPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col md={6}>Tax: </Col>
										<Col md={6}>${order.taxPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col md={6}>Shipping Fee: </Col>
										<Col md={6}>${order.shippingPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col md={6}>Total Price: </Col>
										<Col md={6}>${order.totalPrice}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									{loadingPay && <Loader />}
									{!sdkReady ? null : (
										<PayPalButton
											amount={order.totalPrice}
											onSuccess={successPaymentHandler}
										/>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default OrderScreen
