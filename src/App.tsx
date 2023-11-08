import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { useContext } from 'react'
import { ThemeContext } from './context/theme'

function App() {
  const {theme} = useContext(ThemeContext);

  return (
    <>
      <div className={`h-full w-full mx-auto overflow-y-hidden ${theme === "dark"?"dark":""}`}>
        <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App
