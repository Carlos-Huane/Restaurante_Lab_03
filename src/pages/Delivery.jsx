import { useState, useEffect } from 'react'
import styles from './Delivery.module.css'
import { carritoService, guardarPedidoLocal, platillos } from '../utils/deliveryService'
import { usuariosService } from '../utils/usuariosService'

export default function Delivery() {
  const [direccion, setDireccion] = useState('')
  const [carrito, setCarrito] = useState([])
  const [filtro, setFiltro] = useState('')
  const [mostrarCarrito, setMostrarCarrito] = useState(false)
  const [usuario, setUsuario] = useState(null)
  const [continuarSinSesion, setContinuarSinSesion] = useState(false)
  const [datosTemporal, setDatosTemporal] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  })

  useEffect(() => {
    // Cargar dirección del usuario guardado
    const usuarioGuardado = usuariosService.obtenerUsuario()
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado)
      setDireccion(usuarioGuardado.direccion || '')
    }
  }, [])

  const handleChangeTemporal = (e) => {
    const { name, value } = e.target
    setDatosTemporal(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleContinuarSinSesion = () => {
    setContinuarSinSesion(true)
  }

  const handleVolver = () => {
    setContinuarSinSesion(false)
    setDatosTemporal({
      nombre: '',
      email: '',
      telefono: '',
      direccion: ''
    })
  }

  const platillosFiltrados = carritoService.filtrarPlatillos(filtro)

  const agregarAlCarrito = (platillo) => {
    setCarrito(carritoService.agregarAlCarrito(carrito, platillo))
  }

  const eliminarDelCarrito = (id) => {
    setCarrito(carritoService.eliminarDelCarrito(carrito, id))
  }

  const actualizarCantidad = (id, cantidad) => {
    setCarrito(carritoService.actualizarCantidad(carrito, id, cantidad))
  }

  const total = carritoService.calcularTotal(carrito)
  const costoEnvio = carritoService.calcularEnvio(total)

  const handlePedir = () => {
    let direccionFinal = direccion
    
    if (continuarSinSesion) {
      // Validar datos temporales
      if (!datosTemporal.nombre.trim() || !datosTemporal.direccion.trim() || !datosTemporal.email.trim()) {
        alert('Por favor completa: nombre, email y dirección')
        return
      }
      direccionFinal = datosTemporal.direccion
    }
    
    const resultado = carritoService.confirmarPedido(carrito, direccionFinal)
    
    if (!resultado.valido) {
      alert(resultado.error)
      return
    }

    guardarPedidoLocal(resultado.pedido)
    alert(`¡Pedido confirmado!\nID: ${resultado.pedido.id}\nDirección: ${direccionFinal}\nTotal: $${resultado.pedido.total.toFixed(2)}\nTiempo estimado: ${resultado.pedido.tiempoEstimado} minutos`)
    setCarrito([])
    setDireccion('')
    setDatosTemporal({
      nombre: '',
      email: '',
      telefono: '',
      direccion: ''
    })
  }

  return (
    <div className={styles.container}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitulo}>🚴 Delivery Rápido</h1>
          <p className={styles.heroSub}>Disfruta la comida de Sakura Garden en tu casa. Entrega en menos de 40 minutos.</p>
        </div>
      </section>

      <div className={styles.mainContent}>
        {/* PANEL IZQUIERDO - CATÁLOGO */}
        <section className={styles.catalogo}>
          <div className={styles.seccionDireccion}>
            {usuario ? (
              <>
                <div className={styles.usuarioInfo}>
                  <div className={styles.usuarioHeader}>
                    <span className={styles.usuarioNombre}>👤 {usuario.nombre}</span>
                    <span className={styles.usuarioBadge}>Registrado</span>
                  </div>
                  <p className={styles.usuarioEmail}>{usuario.email}</p>
                </div>

                <label className={styles.label}>
                  📍 Dirección de entrega
                </label>
                <input
                  type="text"
                  placeholder="Calle, número, apartamento..."
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className={styles.inputDireccion}
                />
                <p className={styles.helpText}>Tu dirección guardada está pre-cargada. Cámbiala si es necesario.</p>
              </>
            ) : continuarSinSesion ? (
              <>
                <button
                  onClick={handleVolver}
                  className={styles.btnVolver}
                >
                  ← Volver
                </button>
                <h3 className={styles.subtitulo}>Completa tus datos</h3>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre"
                    value={datosTemporal.nombre}
                    onChange={handleChangeTemporal}
                    className={styles.inputDireccion}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    value={datosTemporal.email}
                    onChange={handleChangeTemporal}
                    className={styles.inputDireccion}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    placeholder="+1 (555) 000-0000"
                    value={datosTemporal.telefono}
                    onChange={handleChangeTemporal}
                    className={styles.inputDireccion}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>📍 Dirección de entrega *</label>
                  <input
                    type="text"
                    name="direccion"
                    placeholder="Calle, número, apartamento..."
                    value={datosTemporal.direccion}
                    onChange={handleChangeTemporal}
                    className={styles.inputDireccion}
                    required
                  />
                </div>

                <p className={styles.helpText}>Los datos se usarán solo para este pedido</p>
              </>
            ) : (
              <div className={styles.usuarioNoRegistrado}>
                <p className={styles.noRegistroTexto}>⚠️ No estás registrado</p>
                <p className={styles.descOpcion}>Tienes dos opciones:</p>
                <a href="/usuarios" className={styles.btnRegistro}>
                  👤 Crear perfil
                </a>
                <button
                  onClick={handleContinuarSinSesion}
                  className={styles.btnContinuar}
                >
                  🛒 Continuar sin sesión
                </button>
              </div>
            )}
          </div>

          <div className={styles.busqueda}>
            <input
              type="text"
              placeholder="🔍 Buscar platillos..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className={styles.inputBusqueda}
            />
          </div>

          <h2 className={styles.seccionTitulo}>Menú</h2>
          <div className={styles.menuGrid}>
            {platillosFiltrados.map(platillo => (
              <div key={platillo.id} className={styles.menuCard}>
                <div className={styles.cardEmoji}>{platillo.emoji}</div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardNombre}>{platillo.nombre}</h3>
                  <p className={styles.cardDesc}>{platillo.desc}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.precio}>${platillo.precio.toFixed(2)}</span>
                    <button
                      onClick={() => agregarAlCarrito(platillo)}
                      className={styles.btnAgregar}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PANEL DERECHO - CARRITO */}
        <aside className={styles.carritoPanel}>
          <button
            className={styles.btnCarritoMobile}
            onClick={() => setMostrarCarrito(!mostrarCarrito)}
          >
            🛒 Carrito ({carrito.length})
          </button>

          <div className={`${styles.carrito} ${mostrarCarrito ? styles.carritoAbierto : ''}`}>
            <h2 className={styles.carritoTitulo}>🛒 Tu Pedido</h2>

            {carrito.length === 0 ? (
              <p className={styles.carritoVacio}>Tu carrito está vacío</p>
            ) : (
              <>
                <div className={styles.carritoItems}>
                  {carrito.map(item => (
                    <div key={item.id} className={styles.carritoItem}>
                      <div className={styles.itemInfo}>
                        <span className={styles.itemEmoji}>{item.emoji}</span>
                        <div className={styles.itemDetalles}>
                          <p className={styles.itemNombre}>{item.nombre}</p>
                          <p className={styles.itemPrecio}>${item.precio.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className={styles.itemControles}>
                        <button
                          onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                          className={styles.btnCantidad}
                        >
                          −
                        </button>
                        <span className={styles.cantidad}>{item.cantidad}</span>
                        <button
                          onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          className={styles.btnCantidad}
                        >
                          +
                        </button>
                        <button
                          onClick={() => eliminarDelCarrito(item.id)}
                          className={styles.btnEliminar}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.resumen}>
                  <div className={styles.resumenLinea}>
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className={styles.resumenLinea}>
                    <span>Envío:</span>
                    <span className={costoEnvio === 0 ? styles.gratis : ''}>
                      {costoEnvio === 0 ? '¡Gratis!' : `$${costoEnvio.toFixed(2)}`}
                    </span>
                  </div>
                  <div className={styles.resumenTotal}>
                    <span>Total:</span>
                    <span>${(total + costoEnvio).toFixed(2)}</span>
                  </div>
                  {total > 0 && total <= 30 && (
                    <p className={styles.oferta}>Agrega ${(30 - total).toFixed(2)} más para envío gratis</p>
                  )}
                </div>

                <button
                  onClick={handlePedir}
                  className={styles.btnPedir}
                >
                  Confirmar Pedido
                </button>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
