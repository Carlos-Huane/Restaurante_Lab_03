import styles from './Placeholder.module.css'

export default function Ofertas() {
  return (
    <div className={styles.page}>
      <span className={styles.icon}>🎁</span>
      <h1 className={styles.titulo}>Ofertas</h1>
      <p className={styles.desc}>Aquí irán las promociones, descuentos y ofertas especiales del restaurante.</p>
    </div>
  )
}
