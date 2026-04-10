import { useState } from 'react'
import { obtenerPedidosLocal, limpiarPedidosLocal } from '../utils/deliveryService'
import styles from './Placeholder.module.css'

export default function MisPedidos() {
  const pedidos = obtenerPedidosLocal()
  const [mostrarDetalle, setMostrarDetalle] = useState(null)

  const handleLimpiar = () => {
    if (confirm('¿Deseas eliminar todo el historial de pedidos?')) {
      limpiarPedidosLocal()
      window.location.reload()
    }
  }

  return (
    <div className={styles.page}>
      <div style={{ maxWidth: '900px', width: '100%', textAlign: 'left' }}>
        <h1 className={styles.titulo}>📋 Mis Pedidos</h1>
        
        {pedidos.length === 0 ? (
          <p className={styles.desc}>No tienes pedidos registrados aún</p>
        ) : (
          <>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <p className={styles.desc} style={{ margin: 0 }}>Total de pedidos: {pedidos.length}</p>
              <button
                onClick={handleLimpiar}
                style={{
                  background: '#c0392b',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              >
                Limpiar historial
              </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {pedidos.map((pedido) => (
                <div
                  key={pedido.id}
                  style={{
                    background: '#1a1a1a',
                    border: '1px solid #333333',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    borderLeft: '4px solid #d4a017'
                  }}
                  onClick={() => setMostrarDetalle(mostrarDetalle === pedido.id ? null : pedido.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#d4a017', fontWeight: '700', fontSize: '0.9rem' }}>ID: {pedido.id}</span>
                    <span style={{ color: '#666666', fontSize: '0.85rem' }}>{pedido.fecha}</span>
                  </div>
                  
                  <div style={{ color: '#ffffff', marginBottom: '0.5rem' }}>
                    📍 {pedido.direccion}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ color: '#888888', marginRight: '1rem' }}>{pedido.items.length} artículo(s)</span>
                      <span style={{ color: '#d4a017', fontWeight: '700' }}>Total: ${pedido.total.toFixed(2)}</span>
                    </div>
                    <span style={{
                      background: '#4caf50',
                      color: 'white',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {pedido.estado.toUpperCase()}
                    </span>
                  </div>

                  {mostrarDetalle === pedido.id && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #333333' }}>
                      <h4 style={{ color: '#d4a017', marginTop: 0, marginBottom: '0.5rem' }}>Detalles:</h4>
                      {pedido.items.map((item, idx) => (
                        <div key={idx} style={{ color: '#aaaaaa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                          {item.emoji} {item.nombre} x{item.cantidad} = ${(item.precio * item.cantidad).toFixed(2)}
                        </div>
                      ))}
                      <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #444444', color: '#888888', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                          <span>Subtotal:</span>
                          <span>${pedido.subtotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                          <span>Envío:</span>
                          <span>${pedido.envio.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#d4a017', fontWeight: '700' }}>
                          <span>Total:</span>
                          <span>${pedido.total.toFixed(2)}</span>
                        </div>
                        <div style={{ marginTop: '0.5rem', color: '#666666', fontSize: '0.85rem' }}>
                          Tiempo estimado: {pedido.tiempoEstimado} minutos
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
