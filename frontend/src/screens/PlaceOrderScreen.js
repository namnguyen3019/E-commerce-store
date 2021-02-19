import React, { useEffect } from 'react'
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

const PlaceOrderScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart)
	const orderCreate = useSelector((state) => state.orderCreate)
	const { error, success, order } = orderCreate
	const { cartItems, shippingAddress, paymentMethod } = cart

	const { address, city, country, postalCode } = shippingAddress
	// Calculate the price
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}

	cart.itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	)

	cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 30)
	cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
	cart.totalPrice = (
		Number(cart.itemsPrice) +
		Number(cart.shippingPrice) +
		Number(cart.taxPrice)
	).toFixed(2)

	const dispatch = useDispatch()

	useEffect(() => {
		if (success) {
			history.push(`/orders/${order._id}`)
		}
	}, [history, success])
	const submitHandler = (e) => {
		e.preventDefault()
		console.log(cart.cartItems)
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				taxPrice: cart.taxPrice,
				shippingPrice: cart.shippingPrice,
				totalPrice: cart.totalPrice,
			})
		)
	}

	const renderCartItems = cartItems.map((item, index) => {
		const subPrice = (item.qty * item.price).toFixed(2)
		return (
			<ListGroup.Item key={index}>
				<Row className="py-1">
					<Col md={1}>
						<Image src={item.image} alt={item.name} fluid rounded />
					</Col>
					<Col md={7}>
						<Link to={`/product/${item.product}`}>
							{' '}
							{item.name}
						</Link>
					</Col>
					<Col
						md={4}
					>{`$ ${item.price} x ${item.qty} = ${subPrice}`}</Col>
				</Row>
			</ListGroup.Item>
		)
	})

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>{`${address}, ${city}, ${country}, ${postalCode}`}</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							{paymentMethod ? (
								<p>{paymentMethod}</p>
							) : (
								<Link to="/payment">
									{' '}
									Choose your payment method
								</Link>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<ListGroup>
								<h2>Order Items</h2>
								{cartItems.length === 0 ? (
									<Message>Cart is empty</Message>
								) : (
									<>{renderCartItems}</>
								)}
							</ListGroup>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<ListGroup>
						<ListGroup.Item>
							<h4 className="text-center"> Order Summary</h4>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col md={6}>{cartItems.length} items</Col>
								<Col md={6}>$ {cart.itemsPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col md={6}>Shipping Price</Col>
								<Col md={6}>$ {cart.shippingPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col md={6}>Tax Price</Col>
								<Col md={6}>$ {cart.taxPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col md={6}>
									<strong>Total Price</strong>
								</Col>
								<Col md={6}>
									<strong>$ {cart.totalPrice}</strong>
								</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							{error && (
								<Message variant="danger">
									Something wrong
								</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								onClick={submitHandler}
								variant="danger"
								type="button"
								className="btn-block"
								disabled={cart.cartItems === 0}
							>
								{' '}
								Place Order
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
		</>
	)
}

export default PlaceOrderScreen
