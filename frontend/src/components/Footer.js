import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
const Footer = () => {
	return (
		<footer>
			<Container fluid className="bg-dark">
				<Row>
					<Col md={4} className="text-center py-3 text-white">
						About Us
					</Col>
					<Col md={4} className="text-center py-3 text-white">
						Contact Us
					</Col>
					<Col md={4} className="text-center py-3 text-white">
						Find us on social media
					</Col>
				</Row>
				<Row>
					<Col className="text-center py-3 text-white">
						{' '}
						Copyright &copy; Nam Nguyen
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
