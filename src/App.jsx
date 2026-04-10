import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Usuarios from './pages/Usuarios'
import Ofertas from './pages/Ofertas'
import Delivery from './pages/Delivery'
import PedidosLocal from './pages/PedidosLocal'
import MisPedidos from './pages/MisPedidos'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/pedidos-local" element={<PedidosLocal />} />
        <Route path="/mis-pedidos" element={<MisPedidos />} />
      </Routes>
    </>
  )
}

export default App
