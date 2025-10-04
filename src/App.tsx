import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { theme } from './styles/theme';
import { PropertiesPage } from './pages/PropertiesPage';
import { CreatePropertyPage } from './pages/CreatePropertyPage';
import { ViewPropertyPage } from './pages/ViewPropertyPage';
import { useLocation } from 'react-router-dom';

import './App.css';

function App() {

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Notifications position="top-right" />
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<PropertiesPage />} />
            <Route path="/addproperty" element={<CreatePropertyPage />} />
            <Route path="/viewproperty" element={<ViewPropertyPage />} />
          </Routes>
        </Router>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;