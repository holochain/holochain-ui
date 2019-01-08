import * as React from 'react'
import { Provider } from 'react-redux'
// import Navigation from './skins/nav'
import DesktopChat from './hApps/holo-chat/components/desktopChat'
// import Home from './skins/home'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const Root = ({ store }: {store: any}) => (
  <Provider store={store}>
    <Router>
      <Route path='/' component={DesktopChat} />
    </Router>
  </Provider>
)

export default Root
