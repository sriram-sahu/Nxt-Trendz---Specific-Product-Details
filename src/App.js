import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
import StudentComponent from './components/StudentComponent'
import MasterComponent from './components/MasterComponent'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/student" component={StudentComponent} />
    <ProtectedRoute exact path="/master" component={MasterComponent} />
    <Redirect to="/login" />
  </Switch>
)

export default App
