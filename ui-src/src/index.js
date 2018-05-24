import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'

import CreateStore from './store'

let store = CreateStore()

ReactDOM.render(<Root store={store} />, document.querySelector('#root'))
