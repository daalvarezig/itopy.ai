/* Archivo: apps/itopy.ai/src/App.jsx */
import { useEffect } from 'react'; // 1. Añade esto
import AppRoutes from "./routes.jsx"
import { captureUTMs } from './utils/marketing'; // 2. Añade tu utilidad

function App() {
  // 3. Activa la captura nada más entrar
  useEffect(() => {
    captureUTMs();
  }, []);

  return <AppRoutes />
}

export default App
