import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, Phone } from 'lucide-react';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Para substituir alert()

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Erro: As senhas digitadas não coincidem.');
      setLoading(false);
      return;
    }
    if (!acceptTerms) {
      setError('Erro: Você deve aceitar os termos e condições para se cadastrar.');
      setLoading(false);
      return;
    }

    // Simulação de lógica de cadastro
    console.log('Cadastro submetido:', formData);
    setTimeout(() => {
      // Simulação de sucesso
      setLoading(false);
      // Navegar para o login ou dashboard
    }, 2000);
  };

  return (
    // Container Principal: Fundo escuro e layout centralizado (estilo Login)
    <div className="login-container">
      
      {/* Efeito de brilho de fundo (apenas estético) */}
      <div className="blob-effects">
          <div className="blob blob-green"></div>
          <div className="blob blob-blue"></div>
      </div>

      <div className="login-wrapper">
        
        {/* Logo e Título */}
        <div className="header-section">
          <div className="logo-box">
            <span>PM</span>
          </div>
          <h1 className="main-title">
            Criar <span className="title-accent">Conta</span>
          </h1>
          <p className="subtitle">Preencha os dados para se juntar ao Pic Money Admin</p>
        </div>

        {/* Formulário com efeito de vidro (Glassmorphism) */}
        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-content">

            {/* Mensagem de Erro (Substitui alert()) */}
            {error && <div className="error-message">{error}</div>}
            
            {/* Linha 1: Nome e Sobrenome (Grid) */}
            <div className="form-grid-2">
              <InputGroup 
                id="firstName"
                label="Nome"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="Seu primeiro nome"
                Icon={User}
                required
              />
              <InputGroup 
                id="lastName"
                label="Sobrenome"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Seu sobrenome"
                Icon={User}
                required
              />
            </div>

            {/* Email */}
            <InputGroup 
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="seu.usuario@dominio.com"
              Icon={Mail}
              required
            />

            {/* Telefone */}
            <InputGroup 
              id="phone"
              label="Telefone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="(00) 99999-9999"
              Icon={Phone}
              required
            />

            {/* Linha 2: Senha e Confirmar Senha (Grid) */}
            <div className="form-grid-2">
              {/* Campo Senha */}
              <div className="input-group password-group">
                <label htmlFor="password" className="input-label">
                  Senha
                </label>
                <Lock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
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

              {/* Campo Confirmar Senha */}
              <div className="input-group password-group">
                <label htmlFor="confirmPassword" className="input-label">
                  Confirmar Senha
                </label>
                <Lock className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className="input-field password-field"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle"
                  aria-label={showConfirmPassword ? "Ocultar Senha" : "Mostrar Senha"}
                >
                  {showConfirmPassword ? <EyeOff className="icon-size" /> : <Eye className="icon-size" />}
                </button>
              </div>
            </div>

            {/* Aceitar Termos */}
            <div className="terms-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="checkbox-input"
                  required
                />
                <span className="checkbox-text">
                  Eu aceito os{' '}
                  <a href="/terms" className="link-register">
                    termos e condições
                  </a>{' '}e a{' '}
                  <a href="/privacy" className="link-register">
                    política de privacidade
                  </a>
                </span>
              </label>
            </div>


            {/* Botão de Cadastro com efeito de Loading */}
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
                  Cadastrando...
                </div>
              ) : (
                'Criar Conta'
              )}
            </button>
          </form>

          {/* Link para Login */}
          <div className="register-link-section">
            <p className="register-text">
              Já tem uma conta?{' '}
              <a href="/login" className="link-register">
                Faça Login
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
          --color-red-error: #EF4444; /* red-500 */
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
          max-width: 32rem; /* Aumentado para acomodar mais campos e o grid */
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
          width: 28rem; /* Aumentado */
          height: 28rem; /* Aumentado */
          border-radius: 9999px; 
          mix-blend-mode: multiply;
          filter: blur(80px); 
          opacity: 0.15; 
          animation: blob-animation 7s infinite;
        }

        .blob-green {
          top: 25%; 
          left: 25%;
          background-color: #00E0A3; 
        }

        .blob-blue {
          bottom: 25%; 
          right: 25%;
          background-color: #3B82F6; 
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
          border-radius: 0.5rem; 
          box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.5), 0 4px 6px -2px rgba(16, 185, 129, 0.5); 
          margin-bottom: 1rem;
        }

        .logo-box span {
          color: var(--color-text-light);
          font-size: 1.875rem; 
          font-weight: 800; 
          letter-spacing: -0.025em; 
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
          backdrop-filter: blur(8px); 
          border-radius: 0.75rem; 
          padding: 2rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); 
          border: 1px solid var(--color-border);
          transition: border-color 0.3s ease;
        }

        .form-card:hover {
          border-color: rgba(16, 185, 129, 0.5); 
        }

        .form-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem; 
        }

        .form-grid-2 {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        @media (min-width: 768px) { /* md: */
            .form-grid-2 {
                grid-template-columns: 1fr 1fr;
            }
        }
        
        /* Mensagem de Erro */
        .error-message {
          background-color: rgba(239, 68, 68, 0.1); /* red-500/10 */
          color: var(--color-red-error);
          padding: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid var(--color-red-error);
          font-size: 0.875rem;
          font-weight: 500;
          text-align: center;
        }

        /* Campos de Input */
        .input-group {
          position: relative;
        }

        .input-label {
          display: block;
          color: var(--color-text-mid);
          font-size: 0.875rem; 
          font-weight: 500; 
          margin-bottom: 0.5rem;
        }

        .input-icon {
          position: absolute;
          left: 0.75rem; 
          top: 50%;
          margin-top: 0.75rem; 
          transform: translateY(-50%);
          color: var(--color-text-dark);
          width: 1.25rem; 
          height: 1.25rem; 
        }

        .input-field {
          width: 100%;
          background-color: var(--color-input-bg);
          border: 1px solid var(--color-border);
          border-radius: 0.5rem; 
          padding: 0.75rem 1rem 0.75rem 2.75rem; 
          color: var(--color-text-light);
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .input-field::placeholder {
          color: var(--color-text-dark);
        }

        .input-field:focus {
          outline: none;
          border-color: rgba(16, 185, 129, 0.8); 
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5); 
        }

        /* Campo de Senha Específico */
        .password-field {
          padding-right: 3rem; 
        }

        .password-toggle {
          position: absolute;
          right: 0.75rem; 
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
        
        /* Aceitar Termos */
        .terms-row {
          display: flex;
          align-items: center;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start; /* Alinha o checkbox no topo do texto */
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
          appearance: none; 
          margin-right: 0.5rem;
          margin-top: 0.1rem; /* Ajuste fino */
          transition: all 0.2s ease;
          flex-shrink: 0; /* Evita que o checkbox encolha */
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
          line-height: 1.4;
        }

        /* Botão de Cadastro */
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

        /* Rodapé de Login */
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

// Componente auxiliar para o campo de input (copiado do Login)
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

export default Register;
