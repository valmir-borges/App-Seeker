import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definindo o contexto de autenticação
export const AuthContext = createContext();

// Definindo as paletas de cores para os temas claro e escuro
const lightTheme = {
    primary: '#4654A3',
    secondary: '#4654A3',
    background: '#F3EFE4',
    placeholder: 'black',
    text: '#4654A3',
    border: 'black',
    textName: 'black',
    textNamePessoa: '#FFFF',
    backgroundButton: '#4654A3'

  };
  
  const darkTheme = {
    primary: '#FFFF',
    secondary: '#FFFF',
    background: '#000B1D',
    placeholder: '#FFFF',
    text: '#FFFF',
    border: '#FFFF',
    textName: '#848AF9',
    backgroundButton: '#4654A3'
  };
  

// Componente Provider para o contexto de autenticação
function AuthProvider({ children }) {
  const [logado, setLogado] = useState(false);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState('light'); // Estado do tema (light ou dark)

  async function Login(email, senha) {
    try {
      await fetch('http://10.139.75.46:5000/api/Usuario/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          UsuarioEmail: email,
          UsuarioSenha: senha
        })
      })
      .then(async (res) => {
        if (res.status === 200) {
          const responseData = await res.json();
          const usuarioId = responseData.usuarioId.toString();
          const usuarioNome = responseData.usuarioNome;

          await AsyncStorage.setItem("userId", usuarioId);
          await AsyncStorage.setItem("userName", usuarioNome);

          setLogado(true);
        } else {
          setError(true);
        }
      })
      .catch(err => {
        console.error(err);
        setError(true);
      });
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }

  async function Cadastrar(nome, telefone, email, senha) {
    if (!nome || !telefone || !email || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    try {
      await fetch('http://10.139.75.46:5000/api/Usuario/CreateUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          UsuarioNome: nome,
          UsuarioTelefone: telefone,
          UsuarioEmail: email,
          UsuarioSenha: senha
        })
      })
      .then(async (res) => {
        if (res.status === 200) {
          const responseData = await res.json();
          const usuarioId = responseData.usuarioId.toString();
          const usuarioNome = responseData.usuarioNome;

          await AsyncStorage.setItem("userId", usuarioId);
          await AsyncStorage.setItem("userName", usuarioNome);

          setLogado(true);
        } 
        if(res.status === 500)
          {
            setError('Email já existe!')
          }
        else {
          setError(true);
        }
      })
      .catch(err => {
        console.error(err);
        setError(true);
      });
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }

  // Função para alternar entre temas
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Seleciona o tema com base no estado atual
  const selectedTheme = theme === 'light' ? lightTheme : darkTheme;

  async function Logout(){
    setLogado(false)
    await AsyncStorage.clear()
  }

  return (
    <AuthContext.Provider value={{ logado, Login, error, Cadastrar, theme: selectedTheme, toggleTheme, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
