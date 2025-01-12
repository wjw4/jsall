import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { I18nProvider } from '@i18n'
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
			<I18nProvider>
				<AuthProvider>
					<HttpProvider>
						<Routes />
					</HttpProvider>
				</AuthProvider>
			</I18nProvider>
		</Router>
	)
}

ReactDOM.render(
	// <React.StrictMode>
	<App />,
	// </React.StrictMode>,
	document.getElementById('root'),
)
