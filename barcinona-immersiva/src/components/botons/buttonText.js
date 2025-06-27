export default function ButtonText({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`headline3 ${className}`}
      style={{
        background: 'var(--color-red500)',
        border: 'none',
        color: 'var(--color-white)',
        padding: '8px 12px',
        cursor: 'pointer',
        width: '268px',
        height: '49px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px', // <--- això afegeix separació entre icona i text
      }}
    >
      {children}
    </button>
  );
}
