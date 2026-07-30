import './App.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Explore from './pages/Explore'
import CardInfo from './pages/CardInfo';
import Favorites from './pages/Favorites';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className='app__content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/card/:id" element={<CardInfo />} />
            <Route path="/favorites" element={<Favorites />}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
