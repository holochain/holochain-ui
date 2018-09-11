import React from 'react'
import { Provider } from 'react-redux'
// import Navigation from './skins/nav'
import Home from './skins/home'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path='/' component={Home} />
    </Router>
  </Provider>
)

export default Root
