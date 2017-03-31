import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
// AppContainer 是一个 HMR 必须的包裹(wrapper)组件

import Header from './container'

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component/>
        </AppContainer>, document.getElementById('root'))
}

render(Header)

// 模块热替换的 API
if (module.hot) {
    module.hot.accept('./container/', () => {
        render(Header)
    })
}
