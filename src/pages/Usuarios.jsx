import React, { useState } from 'react';
import styles from './Usuarios.module.css';

export default function Usuarios() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login con:', email, password);
  };

  return (
    <div className={styles.page}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <span className={styles.icon}>👤</span>
          <h1 className={styles.titulo}>Acceso <span className={styles.dorado}>Privado</span></h1>
          <p className={styles.desc}>Gestiona tu perfil y reservas</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="nombre@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className={styles.inputBox}>
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className={styles.extra}>
            <a href="#" className={styles.linkDorado}>¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className={styles.btnPrimario}>
            ENTRAR
          </button>
        </form>

        <div className={styles.footer}>
          <p>¿Aún no tienes cuenta? <a href="#" className={styles.dorado}>Regístrate</a></p>
        </div>
      </div>
    </div>
  );
}