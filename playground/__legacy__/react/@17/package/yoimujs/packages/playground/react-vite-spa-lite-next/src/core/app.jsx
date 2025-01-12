import { createRoot } from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import { AuthProvider } from '@/core/hooks/use-auth'
import { Routes } from '@/core/routes'
import { HttpProvider } from '@/core/hooks/http/use-http'
import '@/core/style/app.scss'
import '@/core/lib/dev-log'

const App = () => {
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

const container = document.getElementById('root')
const root = createRoot(container)

root.render(<App />)
