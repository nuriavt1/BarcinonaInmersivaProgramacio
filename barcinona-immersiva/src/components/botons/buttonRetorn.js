import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export default function ButtonRetorn({ color = 'var(--color-neutrals700)' }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        width: 44,
        height: 44,
        justifyContent: 'center',
      }}
    >
      <FaArrowLeft size={24} color={color} />
    </button>
  );
}
