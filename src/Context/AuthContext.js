import { createContext, useState } from "react";

export const AuthContext = createContext(0);

function AuthProvider({children}){

    const [ logado, setLogado] = useState(false)//Criando a const logado no contexto, pois ele será disponível para todo mundo
    const [ error, setError] = useState(false)

    async function Login(email,senha){
        await fetch('https://fakestoreapi.com/auth/login',{//Da onde está sendo requisitado
        method: 'POST',//Pelo método post
        headers: {//Linguagem que está "conversando"
            'content-type': 'application/json'
        },
        body: JSON.stringify({//No corpo da requisição será envidado o email e a senha
            username: email,
            password: senha
            })
        })
        .then(res=> res.json())//Pega a resposta e transforma em json
        .then(json => setLogado((json.token) ? true : false ))//Exibe a resposta
        .catch(error => setError(true))
    }
    return(
        <AuthContext.Provider value={{logado: logado, Login, error: error}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;