import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'
const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id

	const [qty, setQty] = useState(
		location.search ? Number(location.search.split('=')[1]) : 1
	)

	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart
	const dispatch = useDispatch()

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty))
		}
	}, [dispatch, productId, qty])

	const removeFromCartHandler = (id) => {
		//TODO: HANDLE
		dispatch(removeFromCart(id))
	}

	const checkoutHandler = () => {
		// TODO: handler eheckout function
		history.push('/login?redirect=shipping')
	}
	return (
		<div>
			<Row>
				<Col md={8}>
					<h2> Shopping Cart</h2>
					{cartItems.length === 0 ? (
						<Message>
							Your cart is empty. <Link to="/"> Go Back </Link>
						</Message>
					) : (
						<ListGroup>
							{cartItems.map((item) => {
								const subTotal = (
									item.price * item.qty
								).toFixed(2)
								return (
									<ListGroup.Item key={item.product}>
										<Row>
											<Col md={2}>
												<Image
													src={item.image}
													fluid
													rounded
												/>
											</Col>
											<Col md={2}>
												<Link
													to={`/products/:${item.products}`}
												>
													{item.name}
												</Link>
											</Col>
											<Col md={2}>${item.price}</Col>
											<Col md={2}>
												<Form.Control
													as="select"
													value={item.qty}
													onChange={(e) =>
														dispatch(
															addToCart(
																item.product,
																Number(
																	e.target
																		.value
																)
															)
														)
													}
												>
													{[
														...Array(
															item.countInStock
														).keys(),
													].map((x) => (
														<option
															key={x + 1}
															value={x + 1}
														>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
											<Col md={2}>
												<Button
													type="button"
													variant="light"
													onClick={() => {
														removeFromCartHandler(
															item.product
														)
													}}
												>
													<i className="fas fa-trash"></i>
												</Button>
											</Col>
											<Col md={2}>${subTotal}</Col>
										</Row>
									</ListGroup.Item>
								)
							})}
						</ListGroup>
					)}
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup>
							<ListGroup.Item>
								<h2> Total {cartItems.length} items</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<p>
									{' '}
									Total Price: $
									{cartItems
										.reduce(
											(acc, item) =>
												acc + item.price * item.qty,
											0
										)
										.toFixed(2)}
								</p>
							</ListGroup.Item>
							<ListGroup.Item style={{ margin: 'auto' }}>
								<Button
									type="button"
									variant="warning"
									onClick={() => {
										checkoutHandler()
									}}
									disabled={cartItems.length === 0}
								>
									Checkout
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default CartScreen
