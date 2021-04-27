import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'

import App from './App'
import './scss/index.scss'

import store from './redux/store'

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <SnackbarProvider maxSnack={3}>
                    <App />
                </SnackbarProvider>
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root'),
)
