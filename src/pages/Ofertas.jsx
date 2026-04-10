import { Link } from 'react-router-dom'
import styles from './Ofertas.module.css'

const promociones = [
  { 
    id: 1, 
    emoji: '🥢', 
    etiqueta: 'Lunes a Jueves', 
    titulo: 'Combo Omakase Individual', 
    desc: '6 piezas de sushi variado + 2 gyozas + bebida de la casa.',
    precioAntes: '25.00',
    precioAhora: '18.50'
  },
  { 
    id: 2, 
    emoji: '🍜', 
    etiqueta: 'Lunch Especial', 
    titulo: 'Ramen Lover Duo', 
    desc: 'Dos bowls de Tonkotsu Ramen clásicos por un precio especial.',
    precioAntes: '32.00',
    precioAhora: '24.90'
  },
  { 
    id: 3, 
    emoji: '🥟', 
    etiqueta: 'Happy Hour', 
    titulo: 'Festín de Dim Sum', 
    desc: 'Surtido de 12 piezas de vapor (Har Gow y Siu Mai) para compartir.',
    precioAntes: '22.00',
    precioAhora: '15.00'
  },
  { 
    id: 4, 
    emoji: '🍱', 
    etiqueta: 'Fin de Semana', 
    titulo: 'Bento Box Familiar', 
    desc: '4 variedades de platos principales, arroz, ensalada y tempura.',
    precioAntes: '55.00',
    precioAhora: '42.00'
  }
]

export default function Ofertas() {
  return (
    <main className={styles.main}>
      {/* ── HEADER DE SECCIÓN ── */}
      <section className={styles.heroOfertas}>
        <h1 className={styles.tituloPrincipal}>Ofertas <span className={styles.dorado}>Exclusivas</span></h1>
        <p className={styles.subtitulo}>Aprovecha nuestros precios especiales en tus sabores asiáticos favoritos.</p>
      </section>

      {/* ── GRID DE OFERTAS ── */}
      <section className={styles.gridContainer}>
        <div className={styles.ofertasGrid}>
          {promociones.map((promo) => (
            <div key={promo.id} className={styles.ofertaCard}>
              <div className={styles.badge}>{promo.etiqueta}</div>
              <div className={styles.cardHeader}>
                <span className={styles.emoji}>{promo.emoji}</span>
                <h3 className={styles.ofertaTitulo}>{promo.titulo}</h3>
              </div>
              <p className={styles.ofertaDesc}>{promo.desc}</p>
              <div className={styles.precioContenedor}>
                <span className={styles.precioAntes}>${promo.precioAntes}</span>
                <span className={styles.precioAhora}>${promo.precioAhora}</span>
              </div>
              <Link to="/delivery" className={styles.btnPedir}>
                Ordenar Ahora
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOTA AL PIE ── */}
      <section className={styles.infoExtra}>
        <p>* Ofertas válidas por tiempo limitado o hasta agotar existencias. No acumulable con otras promociones.</p>
        <Link to="/" className={styles.linkVolver}>← Volver al Inicio</Link>
      </section>
    </main>
  )
}