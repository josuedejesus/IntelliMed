import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';
import Profileconfig from './pages/Profileconfig';
import Contacts from './pages/Contacts';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/chat/:id?' element={<Chat/>}/>
          <Route path='/history' element={<History/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/adjustments' element={<Profileconfig/>}/>
          <Route path='/contacts' element={<Contacts/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
