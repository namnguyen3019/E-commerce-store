import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { savingPaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
const PaymentScreen = ({ history }) => {
	const [paymentMethod, setPaymentMethod] = useState('PayPal')

	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(savingPaymentMethod(paymentMethod))
		history.push('/placeorder')
	}
	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1> Payment Method </h1>
			<Form submit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							label="PayPal or Credit Card"
							id="PayPal"
							name="paymentMethod"
							value="Paypal"
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>

						<Form.Check
							type="radio"
							label="Stripe"
							id="Stripe"
							name="paymentMethod"
							value="Stripe"
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>

						<Form.Check
							type="radio"
							label="Other"
							id="Other"
							name="paymentMethod"
							value="Other"
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>
			</Form>

			<Button type="submit" onClick={submitHandler} variant="primary">
				Countinue
			</Button>
		</FormContainer>
	)
}

export default PaymentScreen
