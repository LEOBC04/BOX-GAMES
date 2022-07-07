// import './APP.css'
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/landingPage.jsx";
import NavBar from "./components/NavBar/navBar.jsx";
import Home from "./components/Home/home.jsx";
import VideogameDetail from "./components/VideogameDetail/videogameDetail.jsx";
import CreateVideogame from "./components/CreateVideogame/createVideogame.jsx";
import Favorites from "./components/Favorites/favorites.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={< LandingPage />} />
        <Route path="/" element={< NavBar />}>
          <Route path="home" element={< Home />} />
          <Route path="videogame/detail/:id" element={< VideogameDetail />} />
          <Route path="createVideogame" element={< CreateVideogame />} />
          <Route path="favorites" element={< Favorites />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
