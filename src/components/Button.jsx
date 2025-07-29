export default function Buttons({
  type = 'button',
  className = '',
  onClick = () => {},
  children,
  disabled = false,
}) {
  return (
    <button
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}