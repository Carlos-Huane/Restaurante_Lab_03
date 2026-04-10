// Servicio de gestión de usuarios
export const usuariosService = {
  // Obtener datos del usuario
  obtenerUsuario: () => {
    try {
      return JSON.parse(localStorage.getItem('usuario') || 'null')
    } catch (error) {
      console.error('Error obteniendo usuario:', error)
      return null
    }
  },

  // Guardar datos del usuario
  guardarUsuario: (datos) => {
    try {
      const usuarioValidado = {
        nombre: (datos.nombre || '').trim(),
        email: (datos.email || '').trim(),
        telefono: (datos.telefono || '').trim(),
        direccion: (datos.direccion || '').trim(),
        ciudad: (datos.ciudad || '').trim(),
        codigoPostal: (datos.codigoPostal || '').trim(),
        fechaRegistro: datos.fechaRegistro || new Date().toLocaleString('es-ES')
      }

      // Validar que al menos nombre y email estén presentes
      if (!usuarioValidado.nombre || !usuarioValidado.email) {
        return { exito: false, error: 'Nombre y email son obligatorios' }
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(usuarioValidado.email)) {
        return { exito: false, error: 'Email inválido' }
      }

      localStorage.setItem('usuario', JSON.stringify(usuarioValidado))
      return { exito: true, usuario: usuarioValidado }
    } catch (error) {
      console.error('Error guardando usuario:', error)
      return { exito: false, error: 'Error guardando datos' }
    }
  },

  // Actualizar dirección del usuario
  actualizarDireccion: (nuevaDireccion) => {
    try {
      const usuario = usuariosService.obtenerUsuario()
      if (!usuario) {
        return { exito: false, error: 'Usuario no registrado' }
      }

      usuario.direccion = nuevaDireccion.trim()
      localStorage.setItem('usuario', JSON.stringify(usuario))
      return { exito: true, usuario }
    } catch (error) {
      console.error('Error actualizando dirección:', error)
      return { exito: false, error: 'Error actualizando dirección' }
    }
  },

  // Obtener dirección del usuario
  obtenerDireccion: () => {
    const usuario = usuariosService.obtenerUsuario()
    return usuario?.direccion || ''
  },

  // Limpiar datos del usuario (logout)
  limpiarUsuario: () => {
    try {
      localStorage.removeItem('usuario')
      return true
    } catch (error) {
      console.error('Error limpiando usuario:', error)
      return false
    }
  }
}
