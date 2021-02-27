import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderListReducer,
	orderPayReducer,
} from './reducers/orderReducers'
import {
	productCreateReducer,
	productCreateReviewReducer,
	productDeleteReducer,
	productDetailsReducer,
	productListReducer,
	productUpdateReducer,
} from './reducers/productReducers'
import {
	userDeleteReducer,
	userDetailsReducer,
	userListReducer,
	userLoginReducer,
	userProfileByAdminReducer,
	userRegisterReducer,
	userUpdateByAdminReducer,
	userUpdateProfileReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	productCreateReview: productCreateReviewReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	orderList: orderListReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userProfileByAdmin: userProfileByAdminReducer,
	userUpdateByAdmin: userUpdateByAdminReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: { address: '', city: '', country: '', postalCode: '' }
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
