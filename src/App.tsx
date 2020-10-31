import LoginComponents from 'components/Login/LoginComponents'
import SignUpContainer from 'components/Login/SignUpComponent'
import TodoRoute from 'components/Todo/TodoRoute'
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import RootRecoil from 'recoil/Rootrecoil'
import AppContainer from './components/AppContainer'

const App = () => {
  return (
    <BrowserRouter>
      <RootRecoil>
        <Switch>
          <Route path="/" exact component={AppContainer}/>
          <Route path="/signup" exact component={SignUpContainer}/>
          <Route path="/login" exact component={LoginComponents}/>
          <Route path="/todo/:uid" exact component={TodoRoute} />
          {/* <Redirect path="*" to="/" /> */}
          {/* exact == exactly, 주어진 경로와 정확히 맞아야함 */}
        </Switch>
      </RootRecoil>
      </BrowserRouter>
  )
}

export default App
