import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
	createProduct,
	deleteProduct,
	listProducts,
} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
const ProductListScreen = ({ history, match }) => {
	const pageNumber = match.params.pageNumber
	const productList = useSelector((state) => state.productList)
	const { loading, success, products, error, pages, page } = productList

	const userInfo = useSelector((state) => state.userLogin.userInfo)
	const dispatch = useDispatch()

	const productDelete = useSelector((state) => state.productDelete)
	const {
		loading: loadingDelete,
		success: successDelete,
		error: errorDelete,
	} = productDelete

	const productCreate = useSelector((state) => state.productCreate)
	const {
		loading: loadingCreate,
		success: successCreate,
		error: errorCreate,
		createdProduct,
	} = productCreate

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET })

		if (!userInfo || !userInfo.isAdmin) {
			history.push('/login')
		}

		if (successCreate) {
			history.push(`/admin/products/${createdProduct._id}/edit`)
		} else {
			dispatch(listProducts('', pageNumber))
		}
	}, [
		dispatch,
		userInfo,
		successCreate,
		createdProduct,
		successDelete,
		pageNumber,
	])

	const deleteHanlder = (id) => {
		if (window.confirm('Are you sure want to delete this?')) {
			dispatch(deleteProduct(id))
		}
	}

	const createProductHandler = () => {
		dispatch(createProduct())
	}
	return (
		<>
			<Button className="float-right" onClick={createProductHandler}>
				{' '}
				+ Create Product
			</Button>
			<h2> Products </h2>
			{loading ? (
				<Loader>Loading...</Loader>
			) : error ? (
				<Message>Error</Message>
			) : (
				<>
					<Table striped bordered hover responsive className="mt-3">
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Price</th>
								<th>Category</th>
								<th>Brand</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => {
								return (
									<tr key={product._id}>
										<td>{product._id}</td>
										<td>{product.name}</td>
										<td>${product.price}</td>
										<td>{product.category}</td>
										<td>{product.brand}</td>
										<td className="mx-auto">
											<Row className="align-items-center">
												<Col md="6">
													<Button
														size="sm"
														block
														onClick={() =>
															history.push(
																`/admin/products/${product._id}/edit`
															)
														}
													>
														Edit
													</Button>
												</Col>
												<Col md={6}>
													<Button
														variant="danger"
														size="sm"
														onClick={() =>
															deleteHanlder(
																product._id
															)
														}
													>
														Del
													</Button>
												</Col>
											</Row>
										</td>
									</tr>
								)
							})}
						</tbody>
					</Table>
					<Paginate
						pages={pages}
						page={page}
						isAdmin={userInfo.isAdmin}
					/>
				</>
			)}
		</>
	)
}

export default ProductListScreen
