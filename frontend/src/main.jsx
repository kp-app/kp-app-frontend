import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {Provider} from 'react-redux'
import store from './app/store'
import styled from "styled-components";

const StickyHeader = styled.header`
  display: block;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--solid-button-primary-color);
  height: 80px;
  margin-bottom: 10px;
`

ReactDOM.render(
    <Provider store={store}>
        <StickyHeader/>
        <App/>
    </Provider>,
    document.getElementById('root')
)
