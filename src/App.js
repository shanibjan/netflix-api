
import './App.css';
import Banner from './Components/Banner/Banner';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import RowPost from './Components/RowPost/RowPost';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OverView from './Pages/OverView';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Favourites from './Pages/Favourites';
function App() {
  console.log();
  return (
    <Router>
      <Routes>
      <Route Component={Login} exact path='/' />
    </Routes>
    <Routes>
      <Route Component={SignUp}  path='/sign_up' />
    </Routes>
    <Routes>
      <Route Component={Home} path='/home' />
    </Routes>
    <Routes>
      <Route Component={OverView}  path='/over_view' />
    </Routes>
    <Routes>
      <Route Component={Favourites} path='/fav_shows' />
    </Routes>
    
  </Router>
  );
}

export default App;
