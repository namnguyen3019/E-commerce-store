import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const MyOders = ({ orderList }) => {
	return (
		<Table striped bordered hover responsive="sm">
			<thead>
				<tr>
					<th>ID</th>
					<th>Purchase Date</th>
					<th>Total Paid</th>
					<th>Delivery Status</th>
					<th>Detail</th>
				</tr>
			</thead>
			<tbody>
				{orderList.reverse().map((order, index) => {
					return (
						<tr key={index}>
							<td>{order._id}</td>
							<td>{order.createdAt.substring(0, 10)}</td>
							<td>{`$${order.totalPrice}`}</td>
							<td>{order.isDelivered ? 'Done' : 'Shipping'}</td>
							<td>
								<Link to={`/orders/${order._id}`}>
									{' '}
									Details{' '}
								</Link>
							</td>
						</tr>
					)
				})}
			</tbody>
		</Table>
	)
}

export default MyOders
