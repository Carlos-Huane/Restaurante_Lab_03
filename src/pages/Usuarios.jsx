import styles from './Placeholder.module.css'

export default function Usuarios() {
  return (
    <div className={styles.page}>
      <span className={styles.icon}>👤</span>
      <h1 className={styles.titulo}>Usuarios</h1>
      <p className={styles.desc}>Aquí irá la gestión de usuarios: registro, inicio de sesión y perfil.</p>
    </div>
  )
}
