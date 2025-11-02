import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // <-- nova state

  // Redireciona se o usuário já estiver logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/"); // Dashboard
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      // Define persistência de login
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // redireciona para Dashboard
    } catch (error) {
      setErrorMessage("Email ou senha incorretos.");
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="blob-effects">
        <div className="blob blob-green"></div>
        <div className="blob blob-blue"></div>
      </div>

      <div className="login-wrapper">
        <div className="header-section">
          <div className="logo-box"><span>PM</span></div>
          <h1 className="main-title">Pic Money <span className="title-accent">Admin</span></h1>
          <p className="subtitle">Acesso seguro ao seu painel de controle</p>
        </div>

        <div className="form-card">
          <form onSubmit={handleLogin} className="form-content">
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <InputGroup
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.usuario@dominio.com"
              Icon={Mail}
              required
            />

            <div className="input-group password-group">
              <label htmlFor="password" className="input-label">Senha</label>
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field password-field"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff className="icon-size" /> : <Eye className="icon-size" />}
              </button>
            </div>

            {/* Checkbox Lembrar-me */}
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkbox-text">Lembrar-me</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className={`btn-login ${loading ? "btn-loading" : ""}`}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="register-link-section">
            <p className="register-text">
              <Link to="/forgot-password" className="link-forgot">Esqueceu a senha?</Link> |{" "}
              <Link to="/register" className="link-register">Cadastre-se</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Estilos */}
      <style>{`
        .login-container { min-height:100vh; display:flex; align-items:center; justify-content:center; position:relative; background:#000B4F; font-family:'Inter',sans-serif; }
        .login-wrapper { width:100%; max-width:28rem; position:relative; z-index:10; }
        .blob-effects { position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; }
        .blob { position:absolute; width:24rem; height:24rem; border-radius:9999px; mix-blend-mode:multiply; filter:blur(80px); opacity:0.15; animation:blob-animation 7s infinite; }
        .blob-green { top:25%; left:25%; background-color:#00E0A3; }
        .blob-blue { bottom:25%; right:25%; background-color:#3B82F6; animation-delay:2s; }
        @keyframes blob-animation {0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(30px,-50px) scale(1.1);}66%{transform:translate(-20px,20px) scale(0.9);}}

        .header-section { text-align:center; margin-bottom:2rem; }
        .logo-box { display:inline-flex; align-items:center; justify-content:center; width:5rem; height:5rem; background-color:#059669; border-radius:.5rem; margin-bottom:1rem; }
        .logo-box span { color:#F9FAFB; font-size:1.875rem; font-weight:800; }
        .main-title { font-size:1.875rem; font-weight:800; color:#F9FAFB; margin-bottom:.5rem; }
        .title-accent { color:#10B981; }
        .subtitle { color:#6B7280; }

        .form-card { background:rgb(0,20,107); border-radius:.75rem; padding:2rem; border:1px solid #374151; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04); }
        .form-content { display:flex; flex-direction:column; gap:1.5rem; }
        .input-group { position:relative; }
        .input-label { display:block; color:#D1D5DB; font-size:.875rem; font-weight:500; margin-bottom:.5rem; }
        .input-icon { position:absolute; left:.75rem; top:70%; transform:translateY(-50%); color:#6B7280; width:1.25rem; height:1.25rem; }
        .input-field { width:100%; background:rgba(55,65,81,0.5); border:1px solid #374151; border-radius:.5rem; padding:.75rem 1rem .75rem 2.75rem; color:#F9FAFB; }
        .input-field:focus { outline:none; border-color: rgba(16,185,129,0.8); box-shadow:0 0 0 2px rgba(16,185,129,0.5); }
        .password-field { padding-right:3rem; }
        .password-toggle { position:absolute; right:.75rem; top:70%; transform:translateY(-50%); color:#6B7280; background:none; border:none; cursor:pointer; }
        .btn-login { width:100%; padding:.75rem; border-radius:.5rem; font-weight:700; color:#F9FAFB; background:#059669; border:none; cursor:pointer; }
        .btn-login:hover:not(.btn-loading){ background:#047857; }
        .btn-loading { cursor:not-allowed; opacity:.7; }
        .checkbox-label { display:flex; align-items:center; cursor:pointer; }
        .checkbox-input { width:1rem; height:1rem; margin-right:.5rem; cursor:pointer; }
        .checkbox-text { color:#F9FAFB; }
        .error-message { background:rgba(220,38,38,0.2); color:#dc2626; padding:.5rem; border-radius:.5rem; font-size:.875rem; }
        .register-link-section { text-align:center; margin-top:1rem; }
        .link-forgot, .link-register { color:#10B981; text-decoration:none; font-weight:500; }
      `}</style>
    </div>
  );
}

const InputGroup = ({ id, label, type, value, onChange, placeholder, Icon, required }) => (
  <div className="input-group">
    <label htmlFor={id} className="input-label">{label}</label>
    <Icon className="input-icon" />
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="input-field"
    />
  </div>
);

export default Login;
