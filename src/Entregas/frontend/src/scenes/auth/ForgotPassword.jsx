// ForgotPassword.jsx
import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase"; // ajuste o caminho se necessário

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Digite um email para continuar.");
      return;
    }

    // Validação simples de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Digite um email válido.");
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setIsSubmitted(true);
      console.log("Email de recuperação enviado para:", email);
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found') {
        setError("Email não cadastrado.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Email inválido.");
      } else {
        setError("Ocorreu um erro. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="login-container">
        <div className="blob-effects">
          <div className="blob blob-green"></div>
          <div className="blob blob-blue"></div>
        </div>

        <div className="login-wrapper max-w-lg">
          <div className="header-section">
            <div className="logo-box logo-box-success">
              <CheckCircle className="icon-size-large" />
            </div>
            <h1 className="main-title">
              <span className="title-accent">Email</span> Enviado!
            </h1>
            <p className="subtitle">Verifique sua caixa de entrada</p>
          </div>

          <div className="form-card">
            <div className="form-content space-y-6">
              <div className="email-confirmation-box">
                <p className="text-white-mid mb-2">
                  Enviamos um link de recuperação para:
                </p>
                <p className="text-white font-semibold text-lg">{email}</p>
              </div>

              <div className="instruction-text">
                <p>Clique no link enviado para o seu email para redefinir sua senha.</p>
                <p className="mt-2">
                  O link é válido por <span className="text-green font-semibold">24 horas</span>.
                </p>
              </div>

              <div className="pt-2 text-center">
                <p className="text-white-mid text-sm mb-3">
                  Não recebeu o email?
                </p>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="link-register text-sm font-semibold"
                >
                  Reenviar email
                </button>
              </div>
            </div>

            <div className="register-link-section border-t border-gray-700 mt-6 pt-6">
              <a href="/login" className="btn-back-login">
                <ArrowLeft className="w-5 h-5" />
                Voltar para o Login
              </a>
            </div>
          </div>

          <div className="footer-text">
            <p>Feito com 💚 | © 2025 Pic Money Admin.</p>
          </div>
        </div>

        <SharedStyles />
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="blob-effects">
        <div className="blob blob-green"></div>
        <div className="blob blob-blue"></div>
      </div>

      <div className="login-wrapper max-w-md">
        <div className="header-section">
          <div className="logo-box">
            <Mail className="icon-size-large" />
          </div>
          <h1 className="main-title">
            <span className="title-accent">Recuperar</span> Senha
          </h1>
          <p className="subtitle">Digite seu email para receber o link de recuperação</p>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-content">
            {error && <div className="error-message">{error}</div>}

            <div className="info-box">
              <p>
                💡 <span className="font-semibold">Dica:</span> Enviaremos um link seguro para o seu email cadastrado.
                Certifique-se de verificar a caixa de spam caso não encontre a mensagem.
              </p>
            </div>

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

            <button
              type="submit"
              disabled={!email || isLoading}
              className={`btn-login ${isLoading ? 'btn-loading' : ''}`}
            >
              {isLoading ? (
                <div className="loading-content">
                  <svg className="spinner" viewBox="0 0 24 24">
                    <circle className="path" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  </svg>
                  Enviando...
                </div>
              ) : (
                'Enviar Link de Recuperação'
              )}
            </button>

            <a href="/login" className="link-back-login">
              <ArrowLeft className="w-4 h-4" />
              Voltar para o Login
            </a>
          </form>
        </div>

        <div className="footer-text">
          <p>Feito com 💚 | © 2025 Pic Money Admin.</p>
        </div>
      </div>

      <SharedStyles />
    </div>
  );
}

// Input reutilizável
const InputGroup = ({ id, label, type, value, onChange, placeholder, Icon, required, disabled }) => (
    <div className="input-group">
      <label htmlFor={id} className="input-label">{label}</label>
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
        aria-label={label}
      />
    </div>
);

// CSS compartilhado
const SharedStyles = () => (
  <style>{`
    :root {
      --color-dark-bg: #000B4F;
      --color-card-bg: rgb(0, 20, 107);
      --color-border: #374151;
      --color-input-bg: rgba(55, 65, 81, 0.5);
      --color-green: #10B981;
      --color-green-dark: #059669;
      --color-text-light: #F9FAFB;
      --color-text-mid: #D1D5DB;
      --color-text-dark: #6B7280;
    }

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

    .login-wrapper { width: 100%; max-width: 28rem; position: relative; z-index: 10; }

    @keyframes blob-animation {0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(30px,-50px) scale(1.1);}66%{transform:translate(-20px,20px) scale(0.9);}}

    .blob-effects { position: absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; }
    .blob { position:absolute; width:28rem; height:28rem; border-radius:9999px; mix-blend-mode: multiply; filter: blur(80px); opacity:0.15; animation: blob-animation 7s infinite; }
    .blob-green { top:25%; left:25%; background-color:#00E0A3; }
    .blob-blue { bottom:25%; right:25%; background-color:#3B82F6; animation-delay:2s; }

    .header-section { text-align:center; margin-bottom:2rem; }
    .logo-box { display:inline-flex; align-items:center; justify-content:center; width:5rem; height:5rem; background-color: var(--color-green-dark); border-radius:0.5rem; box-shadow:0 10px 15px -3px rgba(16,185,129,0.5),0 4px 6px -2px rgba(16,185,129,0.5); margin-bottom:1rem; color:var(--color-text-light);}
    .logo-box-success { background-color: var(--color-green); }
    .icon-size-large { width:2.5rem; height:2.5rem; }

    .main-title { font-size:1.875rem; font-weight:800; color:var(--color-text-light); margin-bottom:0.5rem; }
    .title-accent { color: var(--color-green); }
    .subtitle { color: var(--color-text-dark); }

    .form-card { background-color: var(--color-card-bg); backdrop-filter: blur(8px); border-radius:0.75rem; padding:2rem; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04); border:1px solid var(--color-border); transition:border-color 0.3s ease; }
    .form-content { display:flex; flex-direction:column; gap:1.5rem; }

    .input-group { position: relative; }
    .input-label { display:block; color: var(--color-text-mid); font-size:0.875rem; font-weight:500; margin-bottom:0.5rem; }
    .input-icon { position:absolute; left:0.75rem; top:70%; transform:translateY(-50%); color:var(--color-text-dark); width:1.25rem; height:1.25rem; }
    .input-field { width:100%; background-color: var(--color-input-bg); border:1px solid var(--color-border); border-radius:0.5rem; padding:0.75rem 1rem 0.75rem 2.75rem; color:var(--color-text-light); font-weight:500; transition:all 0.2s ease; }
    .input-field::placeholder { color: var(--color-text-dark); }
    .input-field:focus { outline:none; border-color: rgba(16,185,129,0.8); box-shadow:0 0 0 2px rgba(16,185,129,0.5); }

    .info-box { background-color: rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.5); border-radius:0.5rem; padding:1rem; color: var(--color-text-mid); font-size:0.875rem; }

    .btn-login { width:100%; padding:0.75rem; border-radius:0.5rem; font-weight:700; color: var(--color-text-light); background-color: var(--color-green); cursor:pointer; border:none; transition:all 0.3s ease; box-shadow:0 10px 15px -3px rgba(16,185,129,0.5),0 4px 6px -2px rgba(16,185,129,0.5);}
    .btn-login:hover:not(.btn-loading) { background-color: var(--color-green-dark); transform: scale(1.01); box-shadow:0 15px 20px -3px rgba(16,185,129,0.7);}
    .btn-login:disabled { background-color: var(--color-text-dark); cursor:not-allowed; transform:none; box-shadow:none;}
    .btn-loading { display:flex; align-items:center; justify-content:center; background-color: var(--color-green-dark); cursor:not-allowed; }
    .loading-content { display:flex; align-items:center; justify-content:center; }
    .spinner { animation: spin 1s linear infinite; height:1.25rem; width:1.25rem; margin-right:0.75rem; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .link-back-login { display:flex; align-items:center; justify-content:center; gap:0.5rem; color: var(--color-text-dark); font-weight:500; text-decoration:none; padding-top:0.5rem; }
    .link-back-login:hover { color: var(--color-text-mid); }

    .link-register { color: var(--color-green); text-decoration:none; transition:color 0.2s; }
    .link-register:hover { color: var(--color-green-dark); text-decoration:underline; }

    .email-confirmation-box { background-color: var(--color-input-bg); border-radius:0.5rem; padding:1.5rem; border:1px solid var(--color-border); text-align:center; }
    .instruction-text { color: var(--color-text-mid); font-size:0.875rem; text-align:center; }

    .text-white { color: var(--color-text-light); }
    .text-white-mid { color: var(--color-text-mid); }
    .text-green { color: var(--color-green); }

    .btn-back-login { width:100%; display:flex; align-items:center; justify-content:center; gap:0.5rem; background-color:#1F2937; border:1px solid var(--color-border); color: var(--color-text-light); font-weight:600; padding:0.75rem; border-radius:0.5rem; text-decoration:none; transition: background-color 0.2s; }
    .btn-back-login:hover { background-color:#374151; }

    .footer-text { margin-top:2rem; text-align:center; color: var(--color-text-dark); font-size:0.75rem; }

    .error-message { background-color: rgba(220,38,38,0.2); color:#dc2626; padding:.5rem; border-radius:.5rem; font-size:0.875rem; text-align:center; }
  `}</style>
);

export default ForgotPassword;
