import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

// Nota: O uso da tag <a> em vez de <Link> (React Router) foi mantido para evitar o erro 
// 'Cannot destructure property basename' que ocorre quando o componente não está envolvido 
// por <BrowserRouter>.

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de lógica de autenticação
    console.log('Login:', { email, password, rememberMe });
    setTimeout(() => {
      // Navegar para o dashboard em caso de sucesso
      setLoading(false);
    }, 1500);
  };

  return (
    // Container Principal: Fundo escuro e layout centralizado
    <div className="login-container">
      
      {/* Efeito de brilho de fundo (apenas estético) */}
      <div className="blob-effects">
          <div className="blob blob-green"></div>
          <div className="blob blob-blue"></div>
      </div>

      <div className="login-wrapper">
        
        {/* Logo e Título */}
        <div className="header-section">
          {/* Logo PM mais moderno e clean */}
          <div className="logo-box">
            <span>PM</span>
          </div>
          <h1 className="main-title">
            Pic Money <span className="title-accent">Admin</span>
          </h1>
          <p className="subtitle">Acesso seguro ao seu painel de controle</p>
        </div>

        {/* Formulário com efeito de vidro (Glassmorphism) */}
        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-content">
            
            {/* Campo Email */}
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

            {/* Campo Senha */}
            <div className="input-group password-group">
              <label htmlFor="password" className="input-label">
                Senha
              </label>
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
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
                aria-label={showPassword ? "Ocultar Senha" : "Mostrar Senha"}
              >
                {showPassword ? <EyeOff className="icon-size" /> : <Eye className="icon-size" />}
              </button>
            </div>

            {/* Opções (Lembrar-me e Esqueci a senha) */}
            <div className="options-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox-input"
                />
                <span className="checkbox-text">Lembrar-me</span>
              </label>
              <a href="/forgot-password" className="link-forgot">
                Esqueceu a senha?
              </a>
            </div>

            {/* Botão de Login com efeito de Loading */}
            <button
              type="submit"
              disabled={loading}
              className={`btn-login ${loading ? 'btn-loading' : ''}`}
            >
              {loading ? (
                <div className="loading-content">
                  <svg className="spinner" viewBox="0 0 24 24">
                    <circle className="path" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="truck" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Carregando...
                </div>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          {/* Link para Cadastro */}
          <div className="register-link-section">
            <p className="register-text">
              Não tem uma conta?{' '}
              <a href="/register" className="link-register">
                Cadastre-se
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="footer-text">
          <p>Feito com 💚 | © 2025 Pic Money Admin.</p>
        </div>
      </div>
   
      <style>{`
        /* Variáveis de Cores */
        :root {
          --color-dark-bg: #000B4F /* Azul Marinho Profundo */
          --color-card-bg: rgb(0, 20, 107) 
          --color-border: #374151; /* gray-700 */
          --color-input-bg: rgba(55, 65, 81, 0.5); /* gray-700/50 */
          --color-green: #10B981; /* green-500 */
          --color-green-dark: #059669; /* green-600 */
          --color-text-light: #F9FAFB; /* white */
          --color-text-mid: #D1D5DB; /* gray-300 */
          --color-text-dark: #6B7280; /* gray-500 */
        }

        /* Estrutura Principal */
        .login-container {
          min-height: 100vh;
          background-color: var(--color-dark-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }
        
        .login-wrapper {
          width: 100%;
          max-width: 28rem; /* max-w-md */
          position: relative;
          z-index: 10;
        }

        /* Efeitos de Brilho (Blob) */
        @keyframes blob-animation {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .blob-effects {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }

        .blob {
          position: absolute;
          width: 24rem; /* w-96 */
          height: 24rem; /* h-96 */
          border-radius: 9999px; /* rounded-full */
          mix-blend-mode: multiply;
          filter: blur(80px); /* blur-3xl */
          opacity: 0.15; /* Aumentado para reforçar o tema */
          animation: blob-animation 7s infinite;
        }

        .blob-green {
          top: 25%; 
          left: 25%;
          background-color: #00E0A3; /* Verde/Ciano mais forte */
        }

        .blob-blue {
          bottom: 25%; 
          right: 25%;
          background-color: #3B82F6; /* Azul primário forte */
          animation-delay: 2s;
        }

        /* Título e Logo */
        .header-section {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo-box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 5rem; 
          height: 5rem;
          background-color: var(--color-green-dark); 
          border-radius: 0.5rem; /* rounded-2xl */
          box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.5), 0 4px 6px -2px rgba(16, 185, 129, 0.5); /* shadow-green-500/50 shadow-xl */
          margin-bottom: 1rem;
        }

        .logo-box span {
          color: var(--color-text-light);
          font-size: 1.875rem; /* text-3xl */
          font-weight: 800; /* font-extrabold */
          letter-spacing: -0.025em; /* tracking-tight */
        }

        .main-title {
          font-size: 1.875rem; 
          font-weight: 800;
          color: var(--color-text-light);
          margin-bottom: 0.5rem;
        }

        .title-accent {
          color: var(--color-green);
        }

        .subtitle {
          color: var(--color-text-dark);
        }

        /* Formulário (Card) */
        .form-card {
          background-color: var(--color-card-bg);
          backdrop-filter: blur(8px); /* backdrop-blur-md */
          border-radius: 0.75rem; /* rounded-xl */
          padding: 2rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); /* shadow-2xl */
          border: 1px solid var(--color-border);
          transition: border-color 0.3s ease;
        }

        .form-card:hover {
          border-color: rgba(16, 185, 129, 0.5); /* hover:border-green-500/50 */
        }

        .form-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem; /* space-y-6 */
        }

        /* Campos de Input */
        .input-group {
          position: relative;
        }

        .input-label {
          display: block;
          color: var(--color-text-mid);
          font-size: 0.875rem; /* text-sm */
          font-weight: 500; /* font-medium */
          margin-bottom: 0.5rem;
        }

        .input-icon {
          position: absolute;
          left: 0.75rem; /* left-3 */
          top: 50%;
          margin-top: 0.75rem; /* mt-3 */
          transform: translateY(-50%);
          color: var(--color-text-dark);
          width: 1.25rem; /* w-5 */
          height: 1.25rem; /* h-5 */
        }

        .input-field {
          width: 100%;
          background-color: var(--color-input-bg);
          border: 1px solid var(--color-border);
          border-radius: 0.5rem; /* rounded-lg */
          padding: 0.75rem 1rem 0.75rem 2.75rem; /* pl-11, py-3 */
          color: var(--color-text-light);
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .input-field::placeholder {
          color: var(--color-text-dark);
        }

        .input-field:focus {
          outline: none;
          border-color: rgba(16, 185, 129, 0.8); /* focus:border-green-500/80 */
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5); /* focus:ring-2 focus:ring-green-500/50 */
        }

        /* Campo de Senha Específico */
        .password-field {
          padding-right: 3rem; /* Espaço para o botão de toggle */
        }

        .password-toggle {
          position: absolute;
          right: 0.75rem; /* right-3 */
          top: 50%;
          margin-top: 0.75rem;
          transform: translateY(-50%);
          color: var(--color-text-dark);
          transition: color 0.2s;
        }

        .password-toggle:hover {
          color: var(--color-green);
        }

        .icon-size {
            width: 1.25rem;
            height: 1.25rem;
        }
        
        /* Opções (Lembrar-me / Esqueci a senha) */
        .options-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .checkbox-input {
          width: 1rem;
          height: 1rem;
          background-color: var(--color-input-bg);
          border: 1px solid var(--color-border);
          border-radius: 0.25rem;
          color: var(--color-green);
          cursor: pointer;
          appearance: none; /* Remove estilo nativo */
          margin-right: 0.5rem;
          transition: all 0.2s ease;
        }

        .checkbox-input:checked {
            background-color: var(--color-green);
            border-color: var(--color-green);
        }
        
        .checkbox-input:focus {
            outline: none;
            box-shadow: 0 0 0 2px var(--color-dark-bg), 0 0 0 4px var(--color-green);
        }

        .checkbox-text {
          color: var(--color-text-mid);
          font-size: 0.875rem;
        }

        .link-forgot {
          color: var(--color-green);
          font-size: 0.875rem;
          font-weight: 500;
          transition: color 0.2s;
        }

        .link-forgot:hover {
          color: var(--color-green-dark);
        }

        /* Botão de Login */
        .btn-login {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: 700;
          color: var(--color-text-light);
          background-color: var(--color-green-dark);
          transition: all 0.3s ease;
          box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.5), 0 4px 6px -2px rgba(16, 185, 129, 0.5); 
          cursor: pointer;
          border: none;
        }
        
        .btn-login:hover:not(.btn-loading) {
          background-color: #047857; /* green-700 */
          transform: scale(1.01);
          box-shadow: 0 15px 20px -3px rgba(16, 185, 129, 0.7); 
        }

        /* Estado de Loading */
        .btn-loading {
          background-color: #047857; /* green-700 */
          cursor: not-allowed;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .loading-content {
            display: flex;
            align-items: center;
        }

        .spinner {
          animation: spin 1s linear infinite;
          height: 1.25rem;
          width: 1.25rem;
          margin-right: 0.75rem;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Rodapé de Cadastro */
        .register-link-section {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-border);
          text-align: center;
        }

        .register-text {
          color: var(--color-text-dark);
          font-size: 0.875rem;
        }

        .link-register {
          color: var(--color-green);
          font-weight: 700;
          transition: color 0.2s;
        }
        
        .link-register:hover {
            color: var(--color-green-dark);
        }

        /* Footer */
        .footer-text {
          margin-top: 2rem;
          text-align: center;
          color: var(--color-text-dark);
          font-size: 0.75rem;
        }
      `}</style>
    </div>
  );
}

// Componente auxiliar para o campo de input
const InputGroup = ({ id, label, type, value, onChange, placeholder, Icon, required }) => (
  <div className="input-group">
    <label htmlFor={id} className="input-label">
      {label}
    </label>
    <Icon className="input-icon" />
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className="input-field"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export default Login;
