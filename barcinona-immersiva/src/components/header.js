import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';

export default function Header() {
  const [menuObert, setMenuObert] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuObert(!menuObert);
  };

  const navegarA = (ruta) => {
    navigate(ruta);
    setMenuObert(false);
  };

  return (
    <header style={{
      position: 'absolute', top: 0, right: 0, padding: '10px', background: '#003333'
    }}>
      <button
        onClick={toggleMenu}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px'
        }}
      >
        <RxHamburgerMenu size={24} color="white" />
      </button>

      {menuObert && (
        <div style={{
          position: 'absolute',
          top: '50px',
          right: '10px',
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '6px',
          boxShadow: '0px 4px 8px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: '10px' }}>
            <li onClick={() => navegarA('/')} style={{ padding: '6px', cursor: 'pointer' }}> Inici</li>
            <li onClick={() => navegarA('/nivells')} style={{ padding: '6px', cursor: 'pointer' }}> Nivells</li>
            <li onClick={() => navegarA('/mapa')} style={{ padding: '6px', cursor: 'pointer' }}> Mapa</li>
            <li onClick={() => navegarA('/biblioteca')} style={{ padding: '6px', cursor: 'pointer' }}> Biblioteca</li>
          </ul>
        </div>
      )}
    </header>
  );
}
