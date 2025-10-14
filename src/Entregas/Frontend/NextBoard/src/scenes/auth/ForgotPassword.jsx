import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simula requisição ao servidor
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log('Email de recuperação enviado para:', email);
    }, 1500);
  };

  // ------------------------------------------------
  // Estado de Email Enviado (isSubmitted = true)
  // ------------------------------------------------
  if (isSubmitted) {
    return (
      <div className="login-container">
        {/* Efeito de brilho de fundo */}
        <div className="blob-effects">
            <div className="blob blob-green"></div>
            <div className="blob blob-blue"></div>
        </div>

        <div className="login-wrapper max-w-lg">
          
          {/* Logo e Título (Estilo de Sucesso) */}
          <div className="header-section">
            <div className="logo-box logo-box-success">
              <CheckCircle className="icon-size-large" />
            </div>
            <h1 className="main-title">
              <span className="title-accent">Email</span> Enviado!
            </h1>
            <p className="subtitle">Verifique sua caixa de entrada</p>
          </div>

          {/* Card de Informação */}
          <div className="form-card">
            <div className="form-content space-y-6">
              
              {/* Box de Email de Confirmação */}
              <div className="email-confirmation-box">
                <p className="text-white-mid mb-2">
                  Enviamos um link de recuperação para:
                </p>
                <p className="text-white font-semibold text-lg">{email}</p>
              </div>

              {/* Instruções */}
              <div className="instruction-text">
                <p>
                  Clique no link enviado para o seu email para redefinir sua senha.
                </p>
                <p className="mt-2">
                  O link é válido por <span className="text-green font-semibold">24 horas</span>.
                </p>
              </div>

              {/* Botão de Reenvio */}
              <div className="pt-2 text-center">
                <p className="text-white-mid text-sm mb-3">
                  Não recebeu o email?
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="link-register text-sm font-semibold"
                >
                  Reenviar email
                </button>
              </div>
            </div>

            {/* Voltar para o Login */}
            <div className="register-link-section border-t border-gray-700 mt-6 pt-6">
              <a
                href="/login"
                className="btn-back-login"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar para o Login
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="footer-text">
            <p>Feito com 💚 | © 2025 Pic Money Admin.</p>
          </div>
        </div>
        
        <SharedStyles />
      </div>
    );
  }

  // ------------------------------------------------
  // Estado Inicial do Formulário (isSubmitted = false)
  // ------------------------------------------------
  return (
    <div className="login-container">
        
        {/* Efeito de brilho de fundo */}
        <div className="blob-effects">
            <div className="blob blob-green"></div>
            <div className="blob blob-blue"></div>
        </div>

      <div className="login-wrapper max-w-md">
        
        {/* Logo e Título */}
        <div className="header-section">
          <div className="logo-box">
            <Mail className="icon-size-large" />
          </div>
          <h1 className="main-title">
            <span className="title-accent">Recuperar</span> Senha
          </h1>
          <p className="subtitle">Digite seu email para receber o link de recuperação</p>
        </div>

        {/* Formulário com efeito de vidro (Glassmorphism) */}
        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-content">
            
            {/* Dica Informativa */}
            <div className="info-box">
              <p>
                💡 <span className="font-semibold">Dica:</span> Enviaremos um link seguro para o seu email cadastrado.
                Certifique-se de verificar a caixa de spam caso não encontre a mensagem.
              </p>
            </div>

            {/* Campo de Email */}
            <InputGroup 
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.usuario@dominio.com"
                Icon={Mail}
                required
                disabled={isLoading}
            />

            {/* Botão de Submissão com Loading */}
            <button
              type="submit"
              disabled={!email || isLoading}
              className={`btn-login ${isLoading ? 'btn-loading' : ''}`}
            >
              {isLoading ? (
                <div className="loading-content">
                  <svg className="spinner" viewBox="0 0 24 24">
                    <circle className="path" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="truck" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </div>
              ) : (
                'Enviar Link de Recuperação'
              )}
            </button>

            {/* Voltar para o Login (Link Simples) */}
            <a
              href="/login"
              className="link-back-login"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o Login
            </a>
          </form>
        </div>

        {/* Footer */}
        <div className="footer-text">
          <p>Feito com 💚 | © 2025 Pic Money Admin.</p>
        </div>
      </div>
      
      <SharedStyles />
    </div>
  );
}

// Componente auxiliar para o campo de input
const InputGroup = ({ id, label, type, value, onChange, placeholder, Icon, required, disabled }) => (
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
        disabled={disabled}
      />
    </div>
);

// Componente para centralizar os estilos CSS
const SharedStyles = () => (
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
          max-width: 28rem; 
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
          width: 28rem; 
          height: 28rem; 
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
          color: var(--color-text-light);
        }

        .logo-box-success {
            background-color: var(--color-green);
        }
        
        .icon-size-large {
            width: 2.5rem;
            height: 2.5rem;
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

        .form-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem; 
        }

        /* Input Group */
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

        /* Informação/Dica Box */
        .info-box {
            background-color: rgba(16, 185, 129, 0.1); /* Green tint */
            border: 1px solid rgba(16, 185, 129, 0.5);
            border-radius: 0.5rem;
            padding: 1rem;
            color: var(--color-text-mid);
            font-size: 0.875rem;
        }

        /* Botão de Submissão */
        .btn-login {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: 700;
          color: var(--color-text-light);
          background-color: var(--color-green);
          transition: all 0.3s ease;
          box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.5), 0 4px 6px -2px rgba(16, 185, 129, 0.5); 
          cursor: pointer;
          border: none;
        }
        
        .btn-login:hover:not(.btn-loading) {
          background-color: var(--color-green-dark); 
          transform: scale(1.01);
          box-shadow: 0 15px 20px -3px rgba(16, 185, 129, 0.7); 
        }
        
        .btn-login:disabled {
            background-color: var(--color-text-dark);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        /* Estado de Loading */
        .btn-loading {
          background-color: var(--color-green-dark); 
          cursor: not-allowed;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .loading-content {
            display: flex;
            align-items: center;
            justify-content: center;
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

        /* Link Voltar para Login (Simples) */
        .link-back-login {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            color: var(--color-text-dark);
            font-weight: 500;
            transition: color 0.2s;
            text-decoration: none;
            padding-top: 0.5rem;
        }
        .link-back-login:hover {
            color: var(--color-text-mid);
        }

        /* Link de Reenvio/Registro */
        .link-register {
          color: var(--color-green);
          transition: color 0.2s;
          text-decoration: none;
        }
        
        .link-register:hover {
            color: var(--color-green-dark);
            text-decoration: underline;
        }

        /* Sucesso Box Styles */
        .email-confirmation-box {
          background-color: var(--color-input-bg);
          border-radius: 0.5rem;
          padding: 1.5rem;
          border: 1px solid var(--color-border);
          text-align: center;
        }

        .instruction-text {
            color: var(--color-text-mid);
            font-size: 0.875rem;
            text-align: center;
        }

        .text-white { color: var(--color-text-light); }
        .text-white-mid { color: var(--color-text-mid); }
        .text-green { color: var(--color-green); }

        /* Botão Voltar para Login (no estado de sucesso) */
        .btn-back-login {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            background-color: #1F2937; /* gray-800 */
            border: 1px solid var(--color-border);
            color: var(--color-text-light);
            font-weight: 600;
            padding: 0.75rem;
            border-radius: 0.5rem;
            transition: background-color 0.2s;
            text-decoration: none;
        }

        .btn-back-login:hover {
            background-color: #374151; /* gray-700 */
        }
        
        /* Footer */
        .footer-text {
          margin-top: 2rem;
          text-align: center;
          color: var(--color-text-dark);
          font-size: 0.75rem;
        }
    `}</style>
);

export default ForgotPassword;
