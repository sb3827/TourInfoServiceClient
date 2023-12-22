import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import '@fontsource/material-icons'
//MDB5 CSS 추가
import '@fortawesome/fontawesome-free/css/all.min.css'
import {BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
