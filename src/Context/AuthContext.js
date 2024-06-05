import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({children}){

    const [ logado, setLogado] = useState(false)//Criando a const logado no contexto, pois ele será disponível para todo mundo
    const [ error, setError] = useState(false)

    async function Login(email, senha) {
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
        .then(res => res.status == 200 ? setLogado(true) : setError(true))
        .catch(err => setError(true))
    }
    
    return(
        <AuthContext.Provider value={{logado: logado, Login, error: error}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;