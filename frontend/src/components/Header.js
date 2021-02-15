import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
const Header = () => {
	return (
		<header>
			<Container>
				<Navbar bg="dark" variant="dark" expand="lg">
					<LinkContainer to="/">
						<Navbar.Brand>Nam Nguyen - Shop</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<LinkContainer to="/cart">
								<Nav.Link>
									<i
										className="fa fa-shopping-cart mx-2"
										aria-hidden="true"
									></i>
									Cart
								</Nav.Link>
							</LinkContainer>

							<LinkContainer to="/login">
								<Nav.Link>
									<i className="fas fa-sign-in-alt mx-2"></i>
									Sign in
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</Container>
		</header>
	)
}

export default Header
