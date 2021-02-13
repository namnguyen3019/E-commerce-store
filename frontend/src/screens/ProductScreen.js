import React, { useEffect } from 'react'
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
const ProductScreen = ({ match }) => {
	const dispatch = useDispatch()
	const productDetails = useSelector((state) => state.productDetails)

	const { loading, error, product } = productDetails
	useEffect(() => {
		dispatch(listProductDetails(match.params.id))
	}, [dispatch, match])

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
								<ListGroup.Item>
									<Button>
										{' '}
										<h5>Add to cart</h5>
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default ProductScreen
