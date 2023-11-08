import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './context/theme.tsx'
import { UserProvider } from './context/user/user.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </ThemeProvider>,
)
