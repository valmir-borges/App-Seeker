import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext(0);

function AuthProvider({children}){

    const [ logado, setLogado] = useState(false)//Criando a const logado no contexto, pois ele será disponível para todo mundo
    const [ error, setError] = useState(false)

    async function Login(email, senha) {
        try {
            await fetch('http://10.139.75.46:5251/api/Usuario/Login', {
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
                    setLogado(true);
                    const responseData = await res.json();
                    const usuarioId = responseData.usuarioId.toString(); // Convertendo para string
                    await AsyncStorage.setItem("userId", usuarioId);
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
    
    
    
    async function Cadastrar(nome, telefone, email, senha){
        if (!nome || !telefone || !email || !senha) {
            setError('Por favor, preencha todos os campos.');
            return; // Impede a execução do cadastro se algum campo estiver vazio
          }
        await fetch('http://10.139.75.46:5251/api/Usuario/CreateUsuario', {
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
        .then(res => res.status == 200 ? setLogado(true) : setError(true))
        .catch(err => setError(true))
    }
    return(
        <AuthContext.Provider value={{logado: logado, Login, error: error, Cadastrar}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;