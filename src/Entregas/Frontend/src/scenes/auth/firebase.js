// firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  setPersistence, 
  browserLocalPersistence, 
  browserSessionPersistence 
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// 1️⃣ Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDC9UaeApM9Cd8LIAcJeLAbhitOrfA5iTM",
  authDomain: "nextboard-bf983.firebaseapp.com",
  projectId: "nextboard-bf983",
  storageBucket: "nextboard-bf983.firebasestorage.app",
  messagingSenderId: "1083933989747",
  appId: "1:1083933989747:web:1040a8531621b961e24306",
  measurementId: "G-DNMTJDN9EB"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Auth e Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// 2️⃣ Função para persistência de login (lembrar-me)
export const setAuthPersistence = (rememberMe) => {
  return setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
};

// 3️⃣ Funções auxiliares

// Criar usuário no Auth
export const createUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Login de usuário
export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Enviar link de redefinição de senha
export const sendPasswordReset = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};

// Salvar dados extras do usuário no Firestore
export const saveUserData = async (uid, data) => {
  const userRef = doc(db, "users", uid);
  return await setDoc(userRef, data);
};
