import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
// import './index.css'
// import App from './App'
import {Provider} from 'react-redux'
import App from './antd/App'
import store from './app/store'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {AuthedHeader} from "./antd/AuthedLayout";
import AdminApp from "./antd/AdminApp";


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <AuthedHeader>
                <Switch>
                    <Route exact path='/'>
                        <App/>
                    </Route>
                    <Route exact path='/admin'>
                        <AdminApp/>
                    </Route>
                </Switch>
            </AuthedHeader>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
)