import { Component } from 'react'
import { Result } from 'antd'

export class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error) {
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		console.error('ErrorBoundary.componentDidCatch')
		console.error(error)
		console.error(errorInfo)
	}

	render() {
		if (this.state.hasError) {
			return (
				<Result
					status="500"
					title="500"
					subTitle="發生致命的錯誤，請聯絡工程師進行處理。"
				/>
			)
		}

		return this.props.children
	}
}
