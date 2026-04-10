import { Link } from 'react-router-dom'
import styles from './Landing.module.css'

const platillos = [
  { emoji: '🍜', nombre: 'Ramen Tonkotsu', desc: 'Caldo de cerdo cremoso, fideos, huevo marinado y chashu.' },
  { emoji: '🍣', nombre: 'Sushi Omakase', desc: 'Selección del chef con los mejores ingredientes del día.' },
  { emoji: '🥟', nombre: 'Gyozas de Pato', desc: 'Empanadillas crujientes rellenas de pato y jengibre.' },
  { emoji: '🍛', nombre: 'Curry Thai Rojo', desc: 'Curry aromático con leche de coco, bambú y verduras.' },
  { emoji: '🦐', nombre: 'Pad Thai de Camarones', desc: 'Fideos de arroz salteados con tamarindo y maní.' },
  { emoji: '🥢', nombre: 'Dim Sum Clásico', desc: 'Surtido de vapor: har gow, siu mai y cheung fun.' },
]

const servicios = [
  { emoji: '🚴', titulo: 'Delivery Rápido', desc: 'Tu pedido en menos de 40 minutos.', ruta: '/delivery' },
  { emoji: '🏮', titulo: 'Pedidos en Local', desc: 'Reserva tu mesa y ordena desde la app.', ruta: '/pedidos-local' },
  { emoji: '🎁', titulo: 'Ofertas Exclusivas', desc: 'Descuentos semanales para clientes registrados.', ruta: '/ofertas' },
]

export default function Landing() {
  return (
    <main className={styles.main}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />

        {/* Columna izquierda — texto */}
        <div className={styles.heroContent}>
          <p className={styles.heroEtiqueta}>Bienvenido a</p>
          <h1 className={styles.heroTitulo}>
            Sakura <span className={styles.dorado}>Garden</span>
          </h1>
          <p className={styles.heroSub}>
            Sabores auténticos de Asia Oriental en el corazón de la ciudad.
            Ramen, sushi, dim sum y mucho más.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/pedidos-local" className={styles.btnPrimario}>
              Pedir en Local
            </Link>
            <Link to="/delivery" className={styles.btnSecundario}>
              Pedir Delivery
            </Link>
          </div>
        </div>

        {/* Columna derecha — panel visual */}
        <div className={styles.heroPanel}>
          <div className={styles.heroPanelCard}>
            <span className={styles.heroPanelEmoji}>🍜</span>
            <p className={styles.heroPanelNombre}>Ramen Tonkotsu</p>
            <p className={styles.heroPanelDesc}>El favorito de nuestra carta</p>
            <div className={styles.heroPanelEstrellas}>★★★★★</div>
          </div>
          <div className={styles.heroPanelStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>+15</span>
              <span className={styles.heroStatLabel}>Años de tradición</span>
            </div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>40+</span>
              <span className={styles.heroStatLabel}>Platillos en carta</span>
            </div>
            <div className={styles.heroStatDiv} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>4.9</span>
              <span className={styles.heroStatLabel}>Valoración media</span>
            </div>
          </div>
        </div>

      </section>

      {/* ── NUESTROS SERVICIOS ── */}
      <section className={styles.seccion}>
        <h2 className={styles.seccionTitulo}>Nuestros Servicios</h2>
        <div className={styles.serviciosGrid}>
          {servicios.map(({ emoji, titulo, desc, ruta }) => (
            <Link to={ruta} key={titulo} className={styles.servicioCard}>
              <span className={styles.servicioEmoji}>{emoji}</span>
              <h3 className={styles.servicioTitulo}>{titulo}</h3>
              <p className={styles.servicioDesc}>{desc}</p>
              <span className={styles.servicioLink}>Ver más →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── MENÚ DESTACADO ── */}
      <section className={`${styles.seccion} ${styles.seccionOscura}`}>
        <h2 className={styles.seccionTitulo}>Menú Destacado</h2>
        <p className={styles.seccionSub}>
          Una selección de nuestros platillos más queridos
        </p>
        <div className={styles.menuGrid}>
          {platillos.map(({ emoji, nombre, desc }) => (
            <div key={nombre} className={styles.menuCard}>
              <div className={styles.menuEmoji}>{emoji}</div>
              <div className={styles.menuInfo}>
                <h3 className={styles.menuNombre}>{nombre}</h3>
                <p className={styles.menuDesc}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/ofertas" className={styles.btnPrimario} style={{ marginTop: '2.5rem', display: 'inline-block' }}>
          Ver Todas las Ofertas
        </Link>
      </section>

      {/* ── POR QUÉ ELEGIRNOS ── */}
      <section className={styles.seccion}>
        <h2 className={styles.seccionTitulo}>¿Por qué elegirnos?</h2>
        <div className={styles.razonesGrid}>
          {[
            { icon: '🌿', t: 'Ingredientes Frescos', d: 'Importamos especias y salsas directamente de Asia.' },
            { icon: '👨‍🍳', t: 'Chefs Especializados', d: 'Nuestros cocineros se formaron en Tokio, Bangkok y Shanghai.' },
            { icon: '⭐', t: 'Calidad Garantizada', d: 'Más de 4.8 estrellas en reseñas verificadas.' },
            { icon: '🕐', t: 'Siempre a Tiempo', d: 'Delivery y atención en local sin esperas innecesarias.' },
          ].map(({ icon, t, d }) => (
            <div key={t} className={styles.razonCard}>
              <span className={styles.razonIcon}>{icon}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BANNER REGISTRO ── */}
      <section className={styles.bannerRegistro}>
        <div className={styles.bannerContent}>
          <h2>Únete a nuestra comunidad</h2>
          <p>Regístrate y accede a descuentos exclusivos, seguimiento de pedidos y mucho más.</p>
          <Link to="/usuarios" className={styles.btnPrimario}>
            Crear cuenta gratis
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          <span>&#127801;</span>
          <span>Sakura Garden</span>
        </div>
        <p className={styles.footerCopy}>© 2026 Sakura Garden. Todos los derechos reservados.</p>
        <nav className={styles.footerNav}>
          <Link to="/usuarios">Usuarios</Link>
          <Link to="/ofertas">Ofertas</Link>
          <Link to="/delivery">Delivery</Link>
          <Link to="/pedidos-local">Pedidos en Local</Link>
        </nav>
      </footer>

    </main>
  )
}
