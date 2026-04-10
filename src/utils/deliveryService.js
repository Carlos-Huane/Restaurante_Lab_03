// Catálogo de platillos
export const platillos = [
  { id: 1, emoji: '🍜', nombre: 'Ramen Tonkotsu', precio: 14.99, desc: 'Caldo de cerdo cremoso con fideos, huevo marinado' },
  { id: 2, emoji: '🍣', nombre: 'Sushi Omakase', precio: 24.99, desc: 'Selección del chef con los mejores ingredientes' },
  { id: 3, emoji: '🥟', nombre: 'Gyozas de Pato', precio: 8.99, desc: 'Empanadillas crujientes rellenas de pato y jengibre' },
  { id: 4, emoji: '🍛', nombre: 'Curry Thai Rojo', precio: 12.99, desc: 'Curry aromático con leche de coco y verduras' },
  { id: 5, emoji: '🦐', nombre: 'Pad Thai', precio: 11.99, desc: 'Fideos de arroz salteados con tamarindo y maní' },
  { id: 6, emoji: '🥢', nombre: 'Dim Sum', precio: 10.99, desc: 'Surtido de vapor: har gow, siu mai y cheung fun' },
]

// Constantes
export const COSTO_ENVIO = 4.99
export const MINIMO_ENVIO_GRATIS = 30
export const TIEMPO_ESTIMADO = '30-40'

// Funciones de gestión del carrito
export const carritoService = {
  // Agregar al carrito
  agregarAlCarrito: (carrito, platillo) => {
    const itemExistente = carrito.find(item => item.id === platillo.id)
    if (itemExistente) {
      return carrito.map(item =>
        item.id === platillo.id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    } else {
      return [...carrito, { ...platillo, cantidad: 1 }]
    }
  },

  // Eliminar del carrito
  eliminarDelCarrito: (carrito, id) => {
    return carrito.filter(item => item.id !== id)
  },

  // Actualizar cantidad
  actualizarCantidad: (carrito, id, cantidad) => {
    if (cantidad > 0) {
      return carrito.map(item =>
        item.id === id ? { ...item, cantidad } : item
      )
    }
    return carrito
  },

  // Calcular total
  calcularTotal: (carrito) => {
    return carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0)
  },

  // Calcular costo de envío
  calcularEnvio: (total) => {
    return total >= MINIMO_ENVIO_GRATIS ? 0 : COSTO_ENVIO
  },

  // Calcular total final
  calcularTotalFinal: (carrito) => {
    const subtotal = carritoService.calcularTotal(carrito)
    const envio = carritoService.calcularEnvio(subtotal)
    return subtotal + envio
  },

  // Obtener monto faltante para envío gratis
  montoPendiente: (total) => {
    if (total >= MINIMO_ENVIO_GRATIS) return 0
    return MINIMO_ENVIO_GRATIS - total
  },

  // Validar carrito antes de pedir
  validarCarrito: (carrito, direccion) => {
    if (!direccion.trim()) {
      return { valido: false, error: 'Por favor, ingresa tu dirección' }
    }
    if (carrito.length === 0) {
      return { valido: false, error: 'Tu carrito está vacío' }
    }
    return { valido: true }
  },

  // Confirmar pedido
  confirmarPedido: (carrito, direccion) => {
    const validacion = carritoService.validarCarrito(carrito, direccion)
    if (!validacion.valido) {
      return validacion
    }

    const subtotal = carritoService.calcularTotal(carrito)
    const envio = carritoService.calcularEnvio(subtotal)
    const totalFinal = subtotal + envio

    const pedido = {
      id: Math.random().toString(36).substr(2, 9),
      fecha: new Date().toLocaleString('es-ES'),
      direccion,
      items: carrito,
      subtotal: parseFloat(subtotal.toFixed(2)),
      envio: parseFloat(envio.toFixed(2)),
      total: parseFloat(totalFinal.toFixed(2)),
      tiempoEstimado: TIEMPO_ESTIMADO,
      estado: 'confirmado'
    }

    return { valido: true, pedido }
  },

  // Filtrar platillos
  filtrarPlatillos: (termino) => {
    if (!termino.trim()) return platillos
    return platillos.filter(p =>
      p.nombre.toLowerCase().includes(termino.toLowerCase()) ||
      p.desc.toLowerCase().includes(termino.toLowerCase())
    )
  },

  // Obtener platillo por ID
  obtenerPlatillo: (id) => {
    return platillos.find(p => p.id === id)
  }
}

// Función para guardar pedido en localStorage
export const guardarPedidoLocal = (pedido) => {
  try {
    const pedidos = JSON.parse(localStorage.getItem('pedidos') || '[]')
    pedidos.push(pedido)
    localStorage.setItem('pedidos', JSON.stringify(pedidos))
    return true
  } catch (error) {
    console.error('Error guardando pedido:', error)
    return false
  }
}

// Función para obtener pedidos del localStorage
export const obtenerPedidosLocal = () => {
  try {
    return JSON.parse(localStorage.getItem('pedidos') || '[]')
  } catch (error) {
    console.error('Error obteniendo pedidos:', error)
    return []
  }
}

// Función para limpiar pedidos del localStorage
export const limpiarPedidosLocal = () => {
  try {
    localStorage.removeItem('pedidos')
    return true
  } catch (error) {
    console.error('Error limpiando pedidos:', error)
    return false
  }
}
