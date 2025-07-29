import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ user }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token al salir
    navigate('/');
  }; // Redirige al login






  return (
    <header className="header">
      <h2 className="header-title">Bienvenido!</h2>
      <button
        className="header-user"
        onClick={handleLogout}
        style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
        title="Cerrar sesión"
        type="button"
      >   
        <span className="user-name">{user}</span>
        <img src="https://i.pravatar.cc/40" alt="avatar" className="user-avatar" />
      </button>
    </header>
  );
}
