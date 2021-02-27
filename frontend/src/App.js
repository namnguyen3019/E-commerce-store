import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import CartScreen from './screens/CartScreen'
import EditUserProfileScreen from './screens/EditUserProfileScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import OrderScreen from './screens/OrderScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductScreen from './screens/ProductScreen'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingScreen from './screens/ShippingScreen'
import UserListScreen from './screens/UserListScreen'
const App = () => {
	const userInfo = useSelector((state) => state.userLogin.userInfo)
	return (
		<>
			<Router>
				<Header />
				<main className="py-3">
					<Container>
						<Route path="/profile" component={ProfileScreen} />
						<Route
							path="/placeorder"
							component={PlaceOrderScreen}
						/>

						<Route path="/orders/:id" component={OrderScreen} />
						<Route path="/payment" component={PaymentScreen} />
						<Route path="/shipping" component={ShippingScreen} />
						<Route path="/login" component={LoginScreen} />
						<Route path="/register" component={RegisterScreen} />
						<Route path="/product/:id" component={ProductScreen} />
						<Route path="/cart/" component={CartScreen} />
						{/* Admin Route */}
						{userInfo && userInfo.isAdmin ? (
							<>
								<Route
									exact
									path="/admin/products"
									component={ProductListScreen}
								/>
								<Route
									exact
									path="/admin/products/page/:pageNumber"
									component={ProductListScreen}
								/>
								<Route
									path="/admin/products/:id/edit"
									component={ProductEditScreen}
									exact
								/>
								<Route
									path="/users/userlist/:id"
									component={EditUserProfileScreen}
								/>
								<Route
									exact
									path="/users/userlist"
									component={UserListScreen}
								/>
							</>
						) : null}

						<Route
							path="/page/:pageNumber"
							component={HomeScreen}
							exact
						/>
						<Route
							path="/search/:keyword"
							component={HomeScreen}
							exact
						/>
						<Route
							exact
							path="/search/:keyword/page/:pageNumber"
							component={HomeScreen}
						/>
						<Route path="/" component={HomeScreen} exact />
					</Container>
				</main>
				<Footer />
			</Router>
		</>
	)
}

export default App
