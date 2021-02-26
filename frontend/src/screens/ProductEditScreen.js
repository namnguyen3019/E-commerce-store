import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
const ProductEditScreen = ({ match, history }) => {
	const productId = match.params.id

	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [brand, setBrand] = useState('')
	const [category, setCategory] = useState('')
	const [countInStock, setCountInStock] = useState(0)
	const [description, setDescription] = useState('')
	const [image, setImage] = useState('')
	const [uploading, setUploading] = useState(false)

	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	const productUpdate = useSelector((state) => state.productUpdate)
	const {
		loading: updateLoading,
		error: updateError,
		success: updateSuccess,
		updatedProduct,
	} = productUpdate
	const dispatch = useDispatch()

	useEffect(() => {
		if (updateSuccess) {
			dispatch({
				type: PRODUCT_UPDATE_RESET,
			})
			history.push('/admin/products')
		} else {
			if (!product.name || product._id !== productId || updateSuccess) {
				dispatch(listProductDetails(productId))
			} else {
				setName(product.name)
				setPrice(product.price)
				setBrand(product.brand)
				setCategory(product.category)
				setCountInStock(product.countInStock)
				setDescription(product.description)
				setImage(product.image)
			}
		}
	}, [dispatch, product, productId, updateSuccess])

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		setUploading(true)

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}

			const { data } = await axios.post('/api/uploads', formData, config)
			setImage(data)
			setUploading(false)
		} catch (error) {
			console.log(error)
			setUploading(false)
		}
	}
	const onSubmitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateProduct(productId, {
				name,
				price,
				brand,
				category,
				countInStock,
				description,
				image,
			})
		)
	}
	return (
		<div>
			Welcome to product edit Screen : {match.params.id}
			<Container fluid>
				<Form onSubmit={onSubmitHandler}>
					<Row>
						<Col>
							<Form.Group>
								<Form.Label>Product Name</Form.Label>
								<Form.Control
									type="text"
									placeholder={name}
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
								<Form.Label>Price</Form.Label>
								<Form.Control
									type="text"
									placeholder={price}
									value={price}
									onChange={(e) => setPrice(e.target.value)}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group>
								<Form.Label>Description</Form.Label>
								<Form.Control
									type="text"
									placeholder={description}
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
								<Form.Label>Brand</Form.Label>
								<Form.Control
									type="text"
									placeholder={brand}
									value={brand}
									onChange={(e) => setBrand(e.target.value)}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group>
								<Form.Label> Category</Form.Label>
								<Form.Control
									type="text"
									placeholder="Category"
									value={category}
									onChange={(e) =>
										setCategory(e.target.value)
									}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group>
								<Form.Label> In stock </Form.Label>
								<Form.Control
									type="text"
									placeholder={countInStock}
									value={countInStock}
									onChange={(e) =>
										setCountInStock(e.target.value)
									}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
								<Form.Label>{image}</Form.Label>
								<Form.File
									className="position-relative"
									name="file"
									label="Choose File"
									id="image-file"
									onChange={uploadFileHandler}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Button type="submit"> Save Changes</Button>
				</Form>
			</Container>
		</div>
	)
}

export default ProductEditScreen
