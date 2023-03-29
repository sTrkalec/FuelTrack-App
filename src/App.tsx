import { BrowserRouter} from 'react-router-dom'
import { Router } from './router'
import './styles/global.css'
import './styles/globalModals.css'


function App() {

  return (
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  )
}

export default App
