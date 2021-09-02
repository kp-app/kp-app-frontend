import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
// import './index.css'
// import App from './App'
import {Provider} from 'react-redux'
import App from './antd/App'
import store from './app/store'
import {BrowserRouter, Route} from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route exact path='/'>
                <App/>
            </Route>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
)