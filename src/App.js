import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App () {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/chat'>Chat</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <PublicOnlyRoute exact path='/login' component={LoginPage}/>
        <PrivateRoute exact path='/chat' component={ChatPage}/>
      </Switch>
    </Router>
  );
}

export default App;
