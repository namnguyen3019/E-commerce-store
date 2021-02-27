import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('')

	const onSubmitHandler = (e) => {
		e.preventDefault()
		if (keyword.trim()) {
			console.log(keyword)
			history.push(`/search/${keyword}`)
		} else {
			history.push('/')
		}
	}

	return (
		<Form onSubmit={onSubmitHandler} inline>
			<Form.Control
				type="text"
				placeholder="Search Product...."
				className="mr-sm-2 ml-sm-5"
				onChange={(e) => setKeyword(e.target.value)}
			></Form.Control>
			<Button type="submit" variant="outline-success">
				Search
			</Button>{' '}
		</Form>
	)
}

export default SearchBox
