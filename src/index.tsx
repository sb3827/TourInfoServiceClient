import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import '@fontsource/material-icons'
//MDB5 CSS 추가
import '@fortawesome/fontawesome-free/css/all.min.css'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './store'
import {CookiesProvider} from 'react-cookie'
import {PersistGate} from 'redux-persist/integration/react'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <CookiesProvider>
        <Provider store={store().store}>
            <PersistGate loading={null} persistor={store().persistor}>
                <DndProvider backend={HTML5Backend}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </DndProvider>
            </PersistGate>
        </Provider>
    </CookiesProvider>
)
