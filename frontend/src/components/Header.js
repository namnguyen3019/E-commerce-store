import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Route } from 'react-router-dom'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = ({ history }) => {
	const userInfo = useSelector((state) => state.userLogin.userInfo)

	const dispatch = useDispatch()
	const logoutHandler = () => {
		dispatch(logout())
	}

	return (
		<header>
			<Container>
				<Navbar bg="dark" variant="dark" expand="lg">
					<LinkContainer to="/">
						<Navbar.Brand>Nam Nguyen - Shop</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Route
							render={({ history }) => (
								<SearchBox history={history} />
							)}
						/>
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
							{userInfo ? (
								<NavDropdown
									title={userInfo.name}
									id="username"
								>
									{userInfo.isAdmin ? (
										<>
											<LinkContainer to="/users/userlist">
												<NavDropdown.Item href="#">
													User List
												</NavDropdown.Item>
											</LinkContainer>
											<LinkContainer to="/admin/products">
												<NavDropdown.Item href="#">
													Product list
												</NavDropdown.Item>
											</LinkContainer>
										</>
									) : null}
									<LinkContainer to="/profile">
										<NavDropdown.Item href="#">
											Profile
										</NavDropdown.Item>
									</LinkContainer>

									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link>
										<i className="fas fa-sign-in-alt mx-2"></i>
										Sign in
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</Container>
		</header>
	)
}

export default Header
