import styles from './Placeholder.module.css'

export default function PedidosLocal() {
  return (
    <div className={styles.page}>
      <span className={styles.icon}>🏮</span>
      <h1 className={styles.titulo}>Pedidos en Local</h1>
      <p className={styles.desc}>Aquí irán los pedidos realizados dentro del restaurante: mesa, carta y estado del pedido.</p>
    </div>
  )
}
