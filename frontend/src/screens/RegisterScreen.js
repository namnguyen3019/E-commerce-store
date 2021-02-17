import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'

const RegisterScreen = ({ location, history }) => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmedPassword, setConfirmedPassword] = useState('')

	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)

	const { loading, error, userInfo } = userLogin

	const redirect = location.search ? location.search.split('=')[1] : '/'

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [history, userInfo, redirect])

	const submitHandler = (e) => {
		e.preventDefault()
		if (password != confirmedPassword) {
			alert('Password not match')
		} else {
			dispatch(register(firstName + ' ' + lastName, email, password))
		}
	}
	return (
		<FormContainer>
			<h1> Sign In </h1>
			{error && <Message variant="danger">{error}</Message>}

			<Form onSubmit={submitHandler}>
				<h4> Your Name </h4>
				<Form.Group controlId="fistName">
					<Form.Control
						type="text"
						placeholder="Enter your first Name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="lastName">
					<Form.Control
						type="text"
						placeholder="Enter your last Name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<h4>Your infor</h4>
				<Form.Group controlId="email">
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="confirmedPassword">
					<Form.Control
						type="password"
						placeholder="Comfirmed password"
						value={confirmedPassword}
						onChange={(e) => setConfirmedPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary">
					Sign Up
				</Button>
			</Form>

			<Row className="py-3 ">
				<Col className="mx-auto">
					Already a customer <Link to="/login">Login</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen
