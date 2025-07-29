// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-comdisticol.svg';
import TextInput from '../components/TextInput';
import Button    from '../components/Button';
import { login } from '../services/authService';

export default function LoginPage() {
  // Estado único para email y password
  const [form, setForm]   = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate          = useNavigate();

  // Maneja cambios en ambos campos
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Envía credenciales al backend
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const { token } = await login(form.email, form.password);
      // Guarda el JWT y redirige
      localStorage.setItem('authToken', token);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  // Limpia el formulario
  const handleCancel = () => {
    setForm({ email: '', password: '' });
    setError('');
  };

  return (
    <div className="login-container">
      <div className="card">
        <img src={logo} alt="Comdiscol Logo" className="logo" />

        <h2 className="form-title">Inicio de Sesión</h2>

        {error && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <TextInput
            name="email"
            type="email"
            label="Email"
            placeholder="tu@correo.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <TextInput
            name="password"
            type="password"
            label="Contraseña"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />

          <Link to="/forgot-password" className="link-text">
            ¿Olvidaste tu contraseña?
          </Link>

          <div className="actions">
            <Button variant="text" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="btn-primary">
              Iniciar Sesión
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
