function CloseButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        background: "transparent",
        padding: 0,
        width: "44px",
        height: "44px",
        cursor: "pointer",
      }}
    >
      <img
        src="/imatgesVaries/closebutton.png"
        alt="Tancar"
        width="44"
        height="44"
        style={{ display: "block" }}
      />
    </button>
  );
}

export default CloseButton;
