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
import Bar from "./scenes/barCEO";
import Form from "./scenes/form";
import Line from "./scenes/lineCEO";
import Pie from "./scenes/pieCEO";
import FAQ from "./scenes/faq";
import Login from './scenes/auth/Login';
import Register from './scenes/auth/Register';
import ForgotPassword from './scenes/auth/ForgotPassword';
import Geography from "./scenes/areaCEO";
import Calendar from "./scenes/calendar/calendar";
import PrivateRoute from "./scenes/auth/PrivateRoute";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./scenes/auth/firebase";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // 🔐 Verificação de login e cargo
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
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

        {/* Estilos de layout fixo */}
        <style>{`
          .app {
            display: flex;
            height: 100vh;
            overflow: hidden;
          }
          .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            transition: margin-left 0.3s ease;
            margin-left: 250px;
          }
          .content.collapsed {
            margin-left: 80px;
          }
        `}</style>

        <div className="app">
          {user && (
            <Sidebar
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          )}
          <main className={`content ${isCollapsed ? "collapsed" : ""}`}>
            {user && <Topbar setIsSidebar={setIsCollapsed} />}
            <Routes>
              {/* Rotas Públicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Rota inicial redirecionando pelo cargo */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    {userRole === "ceo" ? (
                      <DashboardCEO />
                    ) : userRole === "cfo" ? (
                      <DashboardCFO />
                    ) : (
                      <div>Carregando...</div>
                    )}
                  </PrivateRoute>
                }
              />

              {/* Rotas privadas gerais */}
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

              {/* Fallback */}
              <Route path="*" element={user ? <Dashboard /> : <Login />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;