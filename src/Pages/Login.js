import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import {AuthContext} from '../Context/AuthContext'

export default function Login() {

    const [ email, setEmail ] = useState()
    const [ senha, setSenha ] = useState()
    const [ erro, setErro ] = useState(false)

    const {Login, logado, error} = useContext(AuthContext)//Pegando a função login e o logado que está no contexto

    function RealizaLogin(){
        Login(email,senha)
    }
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.containerLogo}>
                <Image
                    source={require('../../assets/Logo-2.png')}
                    style={styles.logo}
                />
                <Text style={styles.textSlogan}>Reúna Esperança. Encontre Pessoas. Seeker.</Text>
            </View>
            <View style={styles.containerLogin}>
                <View style={styles.containerInput}>
                    <View style={styles.containerIcon}>
                        <FontAwesome6 name="user-large" size={40} color="#4654A3" />
                        <Text style={styles.loginText}>LOGIN</Text>
                    </View>
                    <TextInput
                        placeholder="Insira seu email..."
                        placeholderTextColor="white"
                        style={styles.input}
                        value={email}
                        textInput={email} 
                        onChangeText={(digitado) => setEmail(digitado)}
                    />
                    <TextInput
                        placeholder="Insira sua senha..."
                        placeholderTextColor="white"
                        style={styles.input}
                        secureTextEntry={true}
                        value={senha}
                        textInput={senha} 
                        onChangeText={(digitado) => setSenha(digitado)}
                    />
                    <Text style={styles.textEsqueceu}>Esqueceu sua senha?</Text>
                    <TouchableOpacity style={styles.btn} onPress={RealizaLogin}>
                        <Text style={styles.btnText}>ENTRAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {error && 
                <View>
                    <Text style={styles.textError}>Revise os campos. Tente novamente</Text>
                </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F3EFE4',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    containerLogo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 10,
        marginBottom: 20,
    },
    containerLogin: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
        width: '90%',
    },
    input: {
        width: '100%',
        backgroundColor: 'rgba(57, 57, 57, 0.4)',
        height: 50,
        color: 'white',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginTop: 10
    },
    containerInput: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
    },
    btn: {
        width: "70%",
        height: 50,
        borderRadius: 10,
        backgroundColor: "transparent",
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: 1,
        borderColor: 'black'
    },
    btnText: {
        lineHeight: 45,
        color: "white",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        alignContent: "center",
        fontSize: 25,
        fontWeight: "bold",
        color: 'black'
    },
    logo: {
        height: 100,
        width: '100%',
        marginBottom: 10,
        resizeMode: 'contain',
    },
    logoText: {
        color: 'white',
        fontSize: 30,
        marginLeft: 10,
        fontWeight: 'bold',
        marginBottom: 10
    },
    loginText: {
        fontSize: 25,
        color: 'white', 
        fontWeight: 'bold',
        textAlign: 'center', 
        marginBottom: 10,
        color: '#4654A3'
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 10
    },
    textError: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15
    },
    textEsqueceu: {
        color: '#6D75E8',
        textAlign: 'right',
        fontWeight:  'bold',
        marginTop: 5,
        textDecorationLine: 'underline'
    },
    textSlogan: {
        fontWeight: 'bold',
        color:'#270949',
        fontSize: 16
    }
});
