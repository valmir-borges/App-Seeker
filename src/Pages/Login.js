import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { AuthContext } from '../Context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [nome, setNome] = useState();
    const [telefone, setTelefone] = useState();
    const [erro, setErro] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const { Login, logado, error, Cadastrar } = useContext(AuthContext);

    function RealizaLogin() {
        Login(email, senha);
    }

    function RealizaCadastro() {
        Cadastrar(nome, telefone, email, senha);
      }
      

    function toggleForm() {
        setShowRegisterForm(!showRegisterForm);
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
            {showRegisterForm ? (
                <View style={styles.containerLogin}>
                    <View style={styles.containerInput}>
                        <View style={styles.containerIcon}>
                            <FontAwesome6 name="user-large" size={40} color="#4654A3" />
                            <Text style={styles.loginText}>CADASTRO</Text>
                        </View>                        
                        <TextInput
                            placeholder="Nome"
                            placeholderTextColor="white"
                            style={styles.input}
                            value={nome}
                            onChangeText={(digitado) => setNome(digitado)}
                        />
                        <TextInput
                            placeholder="Telefone"
                            placeholderTextColor="white"
                            style={styles.input}
                            value={telefone}
                            onChangeText={(digitado) => setTelefone(digitado)}
                        />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="white"
                            style={styles.input}
                            value={email}
                            onChangeText={(digitado) => setEmail(digitado)}
                        />
                        <TextInput
                            placeholder="Senha"
                            placeholderTextColor="white"
                            style={styles.input}
                            secureTextEntry={true}
                            value={senha}
                            onChangeText={(digitado) => setSenha(digitado)}
                        />
                        <TouchableOpacity style={styles.btn} onPress={RealizaCadastro}>
                            <Text style={styles.btnText}>CADASTRAR</Text>
                        </TouchableOpacity>
                        <Text style={styles.textToggle} onPress={toggleForm}>
                            Já tem uma conta? Faça login
                        </Text>
                    </View>
                </View>
            ) : (
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
                            onChangeText={(digitado) => setEmail(digitado)}
                        />
                        <TextInput
                            placeholder="Insira sua senha..."
                            placeholderTextColor="white"
                            style={styles.input}
                            secureTextEntry={true}
                            value={senha}
                            onChangeText={(digitado) => setSenha(digitado)}
                        />
                        <TouchableOpacity style={styles.btn} onPress={RealizaLogin}>
                            <Text style={styles.btnText}>ENTRAR</Text>
                        </TouchableOpacity>
                        <Text style={styles.textToggle} onPress={toggleForm}>
                            Não tem uma conta? Cadastre-se
                        </Text>
                    </View>
                </View>
            )}
            {error && (
                <View>
                    <Text style={styles.textError}>Revise os campos. Tente novamente</Text>
                </View>
            )}
        </ScrollView>
    );
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
        marginTop: 10,
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
        backgroundColor: "#4654A3",
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: 1,
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
    },
    logo: {
        height: 90,
        width: '100%',
        marginBottom: 10,
        resizeMode: 'contain',
    },
    logoText: {
        color: 'white',
        fontSize: 30,
        marginLeft: 10,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    loginText: {
        fontSize: 25,
        color: 'white', 
        fontWeight: 'bold',
        textAlign: 'center', 
        marginBottom: 10,
        color: '#4654A3',
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 10,
    },
    textError: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 15,
    },
    textSlogan: {
        fontWeight: 'bold',
        color: '#270949',
        fontSize: 16,
    },
    textToggle: {
        color: 'blue',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        textDecorationLine: 'underline',
        fontSize: 18, // Aumenta o tamanho da fonte
        backgroundColor: '#F3EFE4', // Adiciona um fundo para destacar
        padding: 10, // Adiciona espaçamento interno
        borderRadius: 5, // Adiciona bordas arredondadas
    },
});
