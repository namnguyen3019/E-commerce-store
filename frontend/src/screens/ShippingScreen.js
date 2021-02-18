import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savingShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'

const ShippingScreen = ({ history }) => {
	const dispatch = useDispatch()

	const shippingAddress = useSelector((state) => state.cart.shippingAddress)
	const [address, setAddress] = useState(shippingAddress.address)
	const [city, setCity] = useState(shippingAddress.city)
	const [country, setCountry] = useState(shippingAddress.country)
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)

	// useEffect(() => {
	// 	setAddress(shippingAddress.address)
	// 	setCity(shippingAddress.city)
	// 	setCountry(shippingAddress.country)
	// 	setPostalCode(shippingAddress.postalCode)
	// }, [])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			savingShippingAddress({
				address,
				city,
				country,
				postalCode,
			})
		)

		history.push('/payment')
	}
	return (
		<FormContainer>
			<Row>
				<Col xs={12}>
					<CheckoutSteps step1 step2 />
				</Col>
			</Row>

			<h2> Shipping Address </h2>

			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address">
					<Form.Control
						type="text"
						placeholder="Enter your address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="city">
					<Form.Control
						type="text"
						placeholder="City"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="country">
					<Form.Control
						type="text"
						placeholder="Country"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="postalCode">
					<Form.Control
						type="text"
						placeholder="Enter postal code"
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type="submit" submit={submitHandler}>
					{' '}
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen
