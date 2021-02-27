import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import {
	createProductReview,
	listProductDetails,
} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1)
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')

	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	const userLogin = useSelector((state) => state.userLogin)
	const {
		loading: loadingUserLogin,
		error: errorUserLogin,
		userInfo,
	} = userLogin

	const productCreateReview = useSelector(
		(state) => state.productCreateReview
	)
	const {
		loading: loadingCreateReview,
		error: errorCreateReview,
		success: successCreateReview,
	} = productCreateReview

	useEffect(() => {
		if (successCreateReview) {
			alert('Review Submmited')
			setRating(0)
			setComment('')
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
		}
		dispatch(listProductDetails(match.params.id))
	}, [dispatch, match, successCreateReview])

	const addToCartHandler = () => {
		if (product.countInStock > 0) {
			dispatch(addToCart(product._id, qty))
			history.push(`/cart/${match.params.id}?qty=${qty}`)
		} else {
			alert('Out of stock')
		}
	}

	const onSubmitHanlder = (e) => {
		e.preventDefault()
		// SUBMIT review
		dispatch(createProductReview(match.params.id, { rating, comment }))
	}
	return (
		<>
			<h1> Product Details Page</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message children={error} variant="danger" />
			) : (
				<>
					<Link to="/" className="btn btn-light my-3">
						{' '}
						Goback
					</Link>
					<Row>
						<Col md={6}>
							<Image
								src={product.image}
								alt={product.name}
								fluid
							/>
						</Col>
						<Col md={3}>
							<ListGroup>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>
									<span>Price: {product.price}</span>
								</ListGroup.Item>
								<ListGroup.Item>
									<span style={{ color: 'blue' }}>
										Description
									</span>{' '}
									{product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<ListGroup>
								<ListGroup.Item>
									Price: ${product.price}
								</ListGroup.Item>
								<ListGroup.Item>
									Status:{' '}
									{product.countInStock > 0
										? 'In stock'
										: 'Out of stock'}
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as="select"
													value={qty}
													onChange={(e) =>
														setQty(e.target.value)
													}
												>
													{[
														...Array(
															product.countInStock
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
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<Button
										disabled={product.countInStock === 0}
										onClick={() =>
											addToCartHandler(product.id, qty)
										}
									>
										{' '}
										<h5>Add to cart</h5>
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2> Reviews</h2>
							{product.reviews.length === 0 && (
								<Message>No Reviews</Message>
							)}
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h3> Write your review</h3>
									{errorCreateReview && (
										<Message variant="danger">
											{errorCreateReview}
										</Message>
									)}
									{userInfo ? (
										<Form onSubmit={onSubmitHanlder}>
											<Form.Group>
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as="select"
													value={rating}
													onChange={(e) =>
														setRating(
															e.target.value
														)
													}
												>
													<option value="">
														Select ...
													</option>
													<option value="1">
														1-Poor
													</option>
													<option value="2">
														2- Fair
													</option>
													<option value="3">
														3- Good
													</option>
													<option value="4">
														4- Very Good
													</option>
													<option value="5">
														5- Excellent
													</option>
												</Form.Control>
											</Form.Group>
											<Form.Group>
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as="textarea"
													row="3"
													value={comment}
													onChange={(e) =>
														setComment(
															e.target.value
														)
													}
												></Form.Control>
											</Form.Group>
											<Button
												type="submit"
												variant="primary"
											>
												Submit
											</Button>
										</Form>
									) : (
										<Message></Message>
									)}
								</ListGroup.Item>
								{product.reviews.map((review) => {
									return (
										<ListGroup.Item key={review._id}>
											<strong>{review.name}</strong>
											<Rating value={review.rating} />
											<p>
												{review.createdAt.substring(
													0,
													10
												)}
											</p>
											<p>{review.comment}</p>
										</ListGroup.Item>
									)
								})}
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default ProductScreen
