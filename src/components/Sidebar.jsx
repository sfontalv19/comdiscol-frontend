import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo-comdisticol.svg';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <img src={logo} alt="Logo" className="sidebar-logo" />
      <nav className="sidebar-nav">
        <NavLink to="/home"      className="nav-link">Panel de Control</NavLink>
        <NavLink to="/clientes"  className="nav-link">Clientes</NavLink>
        <NavLink to="/provee"    className="nav-link">Proveedores</NavLink>
        <NavLink to="/config"    className="nav-link">Configuración</NavLink>
      </nav>
    </aside>
  );
}
