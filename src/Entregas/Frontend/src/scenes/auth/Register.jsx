// Register.jsx
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, User, Phone, Lock } from "lucide-react";
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cargo: '',  // <-- mantido
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.cargo) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Digite um email válido.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        cargo: formData.cargo,
        createdAt: serverTimestamp()
      });

      alert("Cadastro realizado com sucesso!");
      navigate('/login');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError("Este email já está cadastrado.");
      } else if (err.code === 'auth/weak-password') {
        setError("A senha deve ter no mínimo 6 caracteres.");
      } else {
        setError("Erro ao cadastrar usuário. Tente novamente.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="blob-effects">
        <div className="blob blob-green"></div>
        <div className="blob blob-blue"></div>
      </div>

      <div className="login-wrapper max-w-md">
        <div className="header-section">
          <div className="logo-box"><span>PM</span></div>
          <h1 className="main-title">
            Pic Money <span className="title-accent">Admin</span>
          </h1>
          <p className="subtitle">Crie sua conta para acessar o painel</p>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit} className="form-content">
            {error && <div className="error-message">{error}</div>}

            <InputGroup id="firstName" label="Nome" type="text" value={formData.firstName} onChange={handleChange} Icon={User} placeholder="Seu nome" required />
            <InputGroup id="lastName" label="Sobrenome" type="text" value={formData.lastName} onChange={handleChange} Icon={User} placeholder="Seu sobrenome" required />
            <InputGroup id="email" label="Email" type="email" value={formData.email} onChange={handleChange} Icon={Mail} placeholder="seu.usuario@dominio.com" required />
            <InputGroup id="phone" label="Telefone" type="text" value={formData.phone} onChange={handleChange} Icon={Phone} placeholder="(00) 00000-0000" />

            {/* Select de cargo */}
            <div className="input-group">
              <label htmlFor="cargo" className="input-label">Cargo</label>
              <select id="cargo" value={formData.cargo} onChange={handleChange} className="input-field" required>
                <option value="">Selecione</option>
                <option value="CFO">CFO</option>
                <option value="CEO">CEO</option>
              </select>
            </div>

            <div className="input-group password-group">
              <label htmlFor="password" className="input-label">Senha</label>
              <Lock className="input-icon" />
              <input type={showPassword ? 'text' : 'password'} id="password" value={formData.password} onChange={handleChange} className="input-field password-field" placeholder="••••••••" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                {showPassword ? <EyeOff className="icon-size" /> : <Eye className="icon-size" />}
              </button>
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword" className="input-label">Confirmar Senha</label>
              <Lock className="input-icon" />
              <input type={showPassword ? 'text' : 'password'} id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="input-field password-field" placeholder="••••••••" required />
            </div>

            <button type="submit" disabled={loading} className={`btn-login ${loading ? 'btn-loading' : ''}`}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>

            <p className="register-text mt-4">
              Já tem uma conta? <a href="/login" className="link-register">Entre aqui</a>
            </p>
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

const InputGroup = ({ id, label, type, value, onChange, placeholder, Icon, required }) => (
  <div className="input-group">
    <label htmlFor={id} className="input-label">{label}</label>
    <Icon className="input-icon" />
    <input type={type} id={id} value={value} onChange={onChange} placeholder={placeholder} required={required} className="input-field" />
  </div>
);

const SharedStyles = () => (
  <style>{`
    :root { --color-dark-bg:#000B4F; --color-card-bg:rgb(0,20,107); --color-border:#374151; --color-input-bg:rgba(55,65,81,0.5); --color-green:#10B981; --color-green-dark:#059669; --color-text-light:#F9FAFB; --color-text-mid:#D1D5DB; --color-text-dark:#6B7280; }
    .login-container { min-height:100vh; background-color:var(--color-dark-bg); display:flex; align-items:center; justify-content:center; padding:1rem; position:relative; overflow:hidden; font-family:'Inter',sans-serif; }
    .login-wrapper { width:100%; max-width:28rem; position:relative; z-index:10; }
    .blob-effects { position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; }
    .blob { position:absolute; width:24rem; height:24rem; border-radius:9999px; mix-blend-mode:multiply; filter:blur(80px); opacity:0.15; animation:blob-animation 7s infinite; }
    .blob-green { top:25%; left:25%; background-color:#00E0A3; }
    .blob-blue { bottom:25%; right:25%; background-color:#3B82F6; animation-delay:2s; }
    @keyframes blob-animation {0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(30px,-50px) scale(1.1);}66%{transform:translate(-20px,20px) scale(0.9);}}

    .header-section { text-align:center; margin-bottom:2rem; }
    .logo-box { display:inline-flex; align-items:center; justify-content:center; width:5rem; height:5rem; background-color:var(--color-green-dark); border-radius:.5rem; margin-bottom:1rem; }
    .logo-box span { color:var(--color-text-light); font-size:1.875rem; font-weight:800; }
    .main-title { font-size:1.875rem; font-weight:800; color:var(--color-text-light); margin-bottom:.5rem; }
    .title-accent { color:var(--color-green); }
    .subtitle { color:var(--color-text-dark); }

    .form-card { background-color:var(--color-card-bg); border-radius:.75rem; padding:2rem; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04); border:1px solid var(--color-border); }
    .form-content { display:flex; flex-direction:column; gap:1.5rem; }

    .input-group { position:relative; }
    .input-label { display:block; color:var(--color-text-mid); font-size:0.875rem; font-weight:500; margin-bottom:0.5rem; }
    .input-icon { position:absolute; left:0.75rem; top:70%; transform:translateY(-50%); color:var(--color-text-dark); width:1.25rem; height:1.25rem; }
    .input-field { width:100%; background-color:var(--color-input-bg); border:1px solid var(--color-border); border-radius:.5rem; padding:0.75rem 1rem 0.75rem 2.75rem; color:var(--color-text-light); }
    .input-field:focus { outline:none; border-color: rgba(16,185,129,0.8); box-shadow:0 0 0 2px rgba(16,185,129,0.5); }

    .password-field { padding-right:3rem; }
    .password-toggle { position:absolute; right:0.75rem; top:70%; transform:translateY(-50%); color:var(--color-text-dark); }

    .btn-login { width:100%; padding:.75rem; border-radius:.5rem; font-weight:700; color:var(--color-text-light); background-color:var(--color-green-dark); border:none; cursor:pointer; }
    .btn-login:hover:not(.btn-loading){ background-color:#047857; }
    .btn-loading { cursor:not-allowed; opacity:0.7; }

    .link-register { color:var(--color-green); text-decoration:none; font-weight:500; }
    .error-message { background-color:rgba(220,38,38,0.2); color:#dc2626; padding:.5rem; border-radius:.5rem; font-size:0.875rem; }
    .footer-text { text-align:center; margin-top:2rem; color:var(--color-text-dark); font-size:0.875rem; }
  `}</style>
);

export default Register;
