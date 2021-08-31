import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
// import './index.css'
// import App from './App'
import {Provider} from 'react-redux'
import App from './antd/App'
import store from './app/store'


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
