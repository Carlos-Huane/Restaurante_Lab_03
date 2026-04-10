import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const links = [
  { to: '/',              label: 'Inicio',          end: true },
  { to: '/usuarios',      label: 'Usuarios' },
  { to: '/ofertas',       label: 'Ofertas' },
  { to: '/delivery',      label: 'Delivery' },
  { to: '/pedidos-local', label: 'Pedidos en Local' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.brand}>
        <span className={styles.brandIcon}>&#127801;</span>
        <span className={styles.brandName}>Sakura Garden</span>
      </NavLink>

      <button
        className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Abrir menú"
      >
        <span /><span /><span />
      </button>

      <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
        {links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
            onClick={() => setOpen(false)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
