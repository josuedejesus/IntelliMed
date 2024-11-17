import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import History from './pages/History';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/chat/:id?' element={<Chat/>}/>
          <Route path='/history' element={<History/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
