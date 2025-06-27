import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pagines/home'
import Mapa from './pagines/app/mapa'
import OnBoarding from './pagines/onBoarding'
import Video from './pagines/app/video'
import Biblioteca from './pagines/app/biblioteca'
import Progressio from './pagines/app/progressio'
import Nivells from './pagines/app/nivells'
import Detalls from './pagines/app/detalls'
import { NivellProvider } from './context/nivellContext';
import Header from './components/header';
import { TargetesProvider } from './context/targetesContext';
import { VideosProvider } from './context/videoContext';
import { UbicacioProvider } from './context/ubicacioContext';
import ModalGlobal from './components/modals/modalGlobal';
function App() {
  return (
    <div className="App">

      {/*Diferents rutes per navegar per l'aplicació*/}


      <Router>

        <NivellProvider>
          <TargetesProvider>
            <VideosProvider>
              <UbicacioProvider>
                  <Header></Header>
            <Routes>
              {/*Pàgina de Benvinguda*/}
              <Route path="/" element={<Home />} ></Route>
              <Route path="onBoarding" element={<OnBoarding />} ></Route>
              <Route path="mapa" element={<Mapa />} ></Route>
              <Route path="video" element={<Video />} ></Route>
              <Route path="biblioteca" element={<Biblioteca />} ></Route>
              <Route path="progressio" element={<Progressio />} ></Route>
              <Route path="nivells" element={<Nivells />} ></Route>
              <Route path="detalls" element={<Detalls />} ></Route>
            </Routes>
            <ModalGlobal></ModalGlobal>
              </UbicacioProvider>
            </VideosProvider>
          </TargetesProvider>
        </NivellProvider>
      </Router>




    </div>
  );
}

export default App;
