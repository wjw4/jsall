import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { AuthProvider } from '@/core/hooks/use-auth'
import { Routes } from '@/core/routes'
import { HttpProvider } from '@/core/hooks/http/use-http'
import '@/core/style/app.scss'
import '@/core/lib/dev-log'
import moment from 'moment'
import 'moment/dist/locale/zh-tw'

moment.locale('zh-tw')

export const App = () => {
	return (
		<Router>
			<AuthProvider>
				<HttpProvider>
					<Routes />
				</HttpProvider>
			</AuthProvider>
		</Router>
	)
}

ReactDOM.render(
	// <React.StrictMode>
	<App />,
	// </React.StrictMode>,
	document.getElementById('root'),
)
