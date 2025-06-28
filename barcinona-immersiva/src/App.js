import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pagines/home';
import Credits from './pagines/credits';
import Mapa from './pagines/app/mapa';
import OnBoarding from './pagines/onBoarding';
import Video from './pagines/app/video';
import Biblioteca from './pagines/app/biblioteca';
import Progressio from './pagines/app/progressio';
import Nivells from './pagines/app/nivells';
import Detalls from './pagines/app/detalls';
import { NivellProvider } from './context/nivellContext';
import Header from './components/header';
import { TargetesProvider } from './context/targetesContext';
import { VideosProvider } from './context/videoContext';
import { UbicacioProvider } from './context/ubicacioContext';
import ModalGlobal from './components/modals/modalGlobal';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LoadLastPath() {
  const navigate = useNavigate();

  useEffect(() => {
    const lastPath = localStorage.getItem('lastPath');
    if (lastPath && window.location.pathname === '/') {
      navigate(lastPath, { replace: true });
    }
  }, [navigate]);

  return null;
}

function SaveCurrentPath() {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('lastPath', location.pathname);
  }, [location]);

  return null;
}

function AppContent() {
  return (
    <>
      <SaveCurrentPath />
      <LoadLastPath />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="onBoarding" element={<OnBoarding />} />
        <Route path="mapa" element={<Mapa />} />
        <Route path="video" element={<Video />} />
        <Route path="biblioteca" element={<Biblioteca />} />
        <Route path="progressio" element={<Progressio />} />
        <Route path="nivells" element={<Nivells />} />
        <Route path="detalls" element={<Detalls />} />
        <Route path="credits" element={<Credits />} />
      </Routes>

      <ModalGlobal />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <NivellProvider>
          <TargetesProvider>
            <VideosProvider>
              <UbicacioProvider>
                <AppContent />
              </UbicacioProvider>
            </VideosProvider>
          </TargetesProvider>
        </NivellProvider>
      </Router>
    </div>
  );
}

export default App;
