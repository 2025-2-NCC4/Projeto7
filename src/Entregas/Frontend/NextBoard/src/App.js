import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import DashboardCEO from "./scenes/tela-ceo";
import DashboardCFO from "./scenes/tela-cfo";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Login from './scenes/auth/Login';
import Register from './scenes/auth/Register';
import ForgotPassword from './scenes/auth/ForgotPassword';
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
import PrivateRoute from "./scenes/auth/PrivateRoute";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./scenes/auth/firebase";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'ceo' ou 'cfo'
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Buscar o cargo do usuário no Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserRole(userData.cargo?.toLowerCase() || 'ceo');
          } else {
            setUserRole('ceo');
          }
        } catch (error) {
          console.error("Erro ao buscar cargo:", error);
          setUserRole('ceo');
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoadingUser(false);
    });
    
    return () => unsubscribe();
  }, []);

  if (loadingUser) return <div>Carregando...</div>;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Estilos inline diretamente no App.js */}
        <style>{`
          .app {
            display: flex;
            height: 100vh; /* altura total da tela */
            overflow: hidden;
          }

          .content {
            flex: 1; /* ocupa todo espaço disponível */
            display: flex;
            flex-direction: column;
            overflow-y: auto; /* scroll apenas no conteúdo */
            margin-left: 250px; /* largura do sidebar expandido */
            transition: margin-left 0.3s ease;
          }

          .content.collapsed {
            margin-left: 80px; /* largura do sidebar colapsado */
          }
        `}</style>

        <div className="app">
          {user && <Sidebar isCollapsed={!isSidebar} setIsCollapsed={setIsSidebar} />}
          <main className={`content ${!isSidebar ? 'collapsed' : ''}`}>
            {user && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              {/* Rotas Públicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Rota Principal - Redireciona baseado no cargo */}
          <Route path="/" element={
          <PrivateRoute>
              {userRole === 'ceo' ? (
            <DashboardCEO />
                ) : userRole === 'cfo' ? (
                <DashboardCFO />
                ) : (
      <div>Carregando ou cargo não reconhecido...</div>
    )}
  </PrivateRoute>
} />
              {/* Rotas Privadas */}
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/team" element={<PrivateRoute><Team /></PrivateRoute>} />
              <Route path="/contacts" element={<PrivateRoute><Contacts /></PrivateRoute>} />
              <Route path="/invoices" element={<PrivateRoute><Invoices /></PrivateRoute>} />
              <Route path="/form" element={<PrivateRoute><Form /></PrivateRoute>} />
              <Route path="/bar" element={<PrivateRoute><Bar /></PrivateRoute>} />
              <Route path="/pie" element={<PrivateRoute><Pie /></PrivateRoute>} />
              <Route path="/line" element={<PrivateRoute><Line /></PrivateRoute>} />
              <Route path="/faq" element={<PrivateRoute><FAQ /></PrivateRoute>} />
              <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
              <Route path="/geography" element={<PrivateRoute><Geography /></PrivateRoute>} />
              <Route path="/tela-ceo" element={<PrivateRoute><DashboardCEO /></PrivateRoute>} />
              <Route path="/tela-cfo" element={<PrivateRoute><DashboardCFO /></PrivateRoute>} />

              {/* Redirecionamento default */}
              <Route path="*" element={user ? <Dashboard /> : <Login />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
