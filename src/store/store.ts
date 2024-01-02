import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {rootReducer} from './rootReducer'

const useLogger = process.env.NODE_ENV !== 'production'

export const store = () => {
    const middleware: any[] = [thunk]

    if (useLogger) {
        middleware.push(logger)
    }

    const store = configureStore({reducer: rootReducer, middleware})
    return store
}
