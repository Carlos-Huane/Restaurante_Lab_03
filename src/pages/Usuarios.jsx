import { useState, useEffect } from 'react'
import { usuariosService } from '../utils/usuariosService'
import styles from './Usuarios.module.css'

export default function Usuarios() {
  const [usuario, setUsuario] = useState(null)
  const [editando, setEditando] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: ''
  })
  const [mensaje, setMensaje] = useState(null)

  useEffect(() => {
    const usuarioGuardado = usuariosService.obtenerUsuario()
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado)
      setFormData(usuarioGuardado)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGuardar = (e) => {
    e.preventDefault()
    const resultado = usuariosService.guardarUsuario(formData)
    
    if (resultado.exito) {
      setUsuario(resultado.usuario)
      setEditando(false)
      setMensaje({ tipo: 'exito', texto: '✅ Perfil actualizado correctamente' })
      setTimeout(() => setMensaje(null), 3000)
    } else {
      setMensaje({ tipo: 'error', texto: `❌ ${resultado.error}` })
      setTimeout(() => setMensaje(null), 3000)
    }
  }

  const handleEliminar = () => {
    if (confirm('¿Deseas eliminar tu cuenta y todos tus datos?')) {
      usuariosService.limpiarUsuario()
      setUsuario(null)
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        codigoPostal: ''
      })
      setEditando(false)
      setMensaje({ tipo: 'exito', texto: '✅ Cuenta eliminada' })
      setTimeout(() => setMensaje(null), 3000)
    }
  }

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitulo}>👤 Mi Perfil</h1>
        <p className={styles.heroSub}>Gestiona tu cuenta y datos personales</p>
      </section>

      <div className={styles.content}>
        {mensaje && (
          <div className={`${styles.mensaje} ${styles[mensaje.tipo]}`}>
            {mensaje.texto}
          </div>
        )}

        {!usuario ? (
          <div className={styles.card}>
            <p className={styles.noRegistro}>No tienes cuenta registrada</p>
            <p className={styles.instrucciones}>Completa el formulario abajo para crear tu perfil y guarda tu dirección de delivery preferida.</p>
          </div>
        ) : (
          <div className={styles.card}>
            {!editando && (
              <div className={styles.perfil}>
                <div className={styles.perfilHeader}>
                  <h2 className={styles.nombre}>{usuario.nombre}</h2>
                  <button
                    onClick={() => setEditando(true)}
                    className={styles.btnEditar}
                  >
                    ✏️ Editar
                  </button>
                </div>

                <div className={styles.perfilGrid}>
                  <div className={styles.perfilItem}>
                    <span className={styles.label}>Email</span>
                    <span className={styles.valor}>{usuario.email}</span>
                  </div>
                  <div className={styles.perfilItem}>
                    <span className={styles.label}>Teléfono</span>
                    <span className={styles.valor}>{usuario.telefono || 'No registrado'}</span>
                  </div>
                  <div className={styles.perfilItem}>
                    <span className={styles.label}>Dirección</span>
                    <span className={styles.valor}>{usuario.direccion || 'No registrada'}</span>
                  </div>
                  <div className={styles.perfilItem}>
                    <span className={styles.label}>Ciudad</span>
                    <span className={styles.valor}>{usuario.ciudad || 'No registrada'}</span>
                  </div>
                  <div className={styles.perfilItem}>
                    <span className={styles.label}>Código Postal</span>
                    <span className={styles.valor}>{usuario.codigoPostal || 'No registrado'}</span>
                  </div>
                  <div className={styles.perfilItem}>
                    <span className={styles.label}>Registrado desde</span>
                    <span className={styles.valor}>{usuario.fechaRegistro}</span>
                  </div>
                </div>

                <button
                  onClick={handleEliminar}
                  className={styles.btnEliminar}
                >
                  🗑️ Eliminar cuenta
                </button>
              </div>
            )}

            {editando && (
              <form onSubmit={handleGuardar} className={styles.formulario}>
                <div className={styles.formGroup}>
                  <label className={styles.labelForm}>Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.labelForm}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.labelForm}>Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.labelForm}>📍 Dirección de Delivery</label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Calle, número, apartamento..."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.labelForm}>Ciudad</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Tu ciudad"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.labelForm}>Código Postal</label>
                  <input
                    type="text"
                    name="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="12345"
                  />
                </div>

                <div className={styles.botonesFormulario}>
                  <button type="submit" className={styles.btnGuardar}>
                    ✅ Guardar cambios
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditando(false)
                      setFormData(usuario)
                    }}
                    className={styles.btnCancelar}
                  >
                    ❌ Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {!usuario && (
          <div className={styles.card}>
            <form onSubmit={handleGuardar} className={styles.formulario}>
              <h3 className={styles.formTitulo}>Crear mi perfil</h3>

              <div className={styles.formGroup}>
                <label className={styles.labelForm}>Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.labelForm}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.labelForm}>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.labelForm}>📍 Dirección de Delivery</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Calle, número, apartamento..."
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.labelForm}>Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Tu ciudad"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.labelForm}>Código Postal</label>
                <input
                  type="text"
                  name="codigoPostal"
                  value={formData.codigoPostal}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="12345"
                />
              </div>

              <button type="submit" className={styles.btnGuardar}>
                ✅ Crear perfil
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}