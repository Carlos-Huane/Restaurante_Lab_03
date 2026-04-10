import styles from './Placeholder.module.css'

export default function Delivery() {
  return (
    <div className={styles.page}>
      <span className={styles.icon}>🚴</span>
      <h1 className={styles.titulo}>Delivery</h1>
      <p className={styles.desc}>Aquí irá el sistema de pedidos a domicilio: dirección, seguimiento y pago.</p>
    </div>
  )
}
