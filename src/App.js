import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import CONSTANTS from './constants';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AuthActionCreators from './redux/actions/authActionCreators';

function App () {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN)

    if(refreshToken) {
      dispatch(AuthActionCreators.refreshRequest(refreshToken))
    }
  }, []);
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/chat'>Chat</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <PublicOnlyRoute exact path='/login' component={LoginPage} />
        <PrivateRoute exact path='/chat' component={ChatPage} />
      </Switch>
    </Router>
  );
}

export default App;
