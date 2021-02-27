import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listTopProducts } from '../actions/productActions'
const TopProductCarousel = () => {
	const topProducts = useSelector((state) => state.productsTop)

	const { loading, error, success, products } = topProducts

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(listTopProducts())
	}, [dispatch])
	return (
		<Carousel fade>
			{products.length > 0 &&
				products.map((product) => {
					return (
						<Carousel.Item key={product._id} interval={5000}>
							<Link to={`/products/${product._id}`}>
								<Image
									src={product.image}
									alt={product.name}
									fluid
								/>
								<Carousel.Caption className="carousel-caption">
									<h3>{product.name}</h3>
								</Carousel.Caption>
							</Link>
						</Carousel.Item>
					)
				})}
		</Carousel>
	)
}

export default TopProductCarousel
