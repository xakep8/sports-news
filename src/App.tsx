import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { useContext } from 'react'
import { ThemeContext } from './context/theme'

function App() {
  const {theme} = useContext(ThemeContext);

  return (
    <>
      <div className={`h-screen w-full mx-auto ${theme === "dark"?"dark":""}`}>
        <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App
