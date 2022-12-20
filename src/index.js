import React from 'react'
import ReactDOM from 'react-dom/client'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import './index.css'
import './style.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TvShowList from './components/TvshowsList'
import TvShowDetails from './components/TvShowDetails'
import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store/store'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TvShowList />} />
                    <Route
                        path="/showdetails/:id"
                        element={<TvShowDetails />}
                    />
                </Routes>
            </BrowserRouter>
        </PersistGate>
    </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
