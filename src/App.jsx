import { BrowserRouter as Router } from 'react-router-dom';
import { HashRouter as RouterHashed } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AppProvider>
      <RouterHashed>
        <AppRoutes />
      </RouterHashed>
    </AppProvider>
  );
}

export default App;
