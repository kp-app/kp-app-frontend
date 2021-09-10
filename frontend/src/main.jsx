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
import { ItemGrid } from './antd/components/Layout/ItemGrid'
import { CartLayout } from './antd/components/Cart/CartLayout'


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <AuthedHeader>
                {/* Hey, I'm unironically dead inside. This app is a fucking joke fr fr */}
                
                <Route exact path='/'>
                    <App/>
                </Route>
                <Route exact path='/admin'>
                    <AdminApp/>
                </Route>
                <Route path='/category/:categoryId'>
                    <App>
                        <ItemGrid />
                    </App>
                </Route>
                <Route path='/cart'>
                    <App>
                        <CartLayout />
                    </App>
                </Route>
            </AuthedHeader>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
)