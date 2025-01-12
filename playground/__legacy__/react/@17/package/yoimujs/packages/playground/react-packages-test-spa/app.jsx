import ReactDOM from 'react-dom'
import { V6RouterFirstApp } from '@/components/v6-router-first-app'
import { AuthApp } from '@/components/auth-app'
import '@/style/app.scss'

ReactDOM.render(
	// <React.StrictMode>
	<AuthApp />,
	// </React.StrictMode>,
	document.getElementById('root'),
)
