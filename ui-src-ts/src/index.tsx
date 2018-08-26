import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Root from './root'
import CreateStore from './store'

const store = CreateStore()

ReactDOM.render(<Root store={store} />, document.querySelector('#root'))
