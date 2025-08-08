import "../styles/Button.css";

function Button({ type = "button", onClick, children, variant = "primary", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${variant}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
