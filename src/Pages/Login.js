import React, { useContext, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import { AuthContext } from '../Context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [erro, setErro] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const { Login, logado, error, Cadastrar, theme } = useContext(AuthContext);

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
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.containerLogo}>
                <Image
                    source={require('../../assets/Logo-2.png')}
                    style={styles.logo}
                />
                <Text style={[styles.textSlogan, { color: theme.border }]}>Reúna Esperança. Encontre Pessoas. Seeker.</Text>
            </View>
            {showRegisterForm ? (
                <View style={styles.containerLogin}>
                    <View style={styles.containerInput}>
                        <View style={styles.containerIcon}>
                            <FontAwesome6 name="user-large" size={40} color={theme.text} />
                            <Text style={[styles.loginText, { color: theme.text }]}>CADASTRO</Text>
                        </View>                        
                        <TextInput
                            placeholder="Nome"
                            placeholderTextColor={theme.placeholder}
                            style={[styles.input, { color: theme.text}]}
                            value={nome}
                            onChangeText={(digitado) => setNome(digitado)}
                        />
                        <TextInput
                            placeholder="Telefone"
                            placeholderTextColor={theme.placeholder}
                            style={[styles.input, { color: theme.text}]}
                            value={telefone}
                            onChangeText={(digitado) => setTelefone(digitado)}
                        />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={theme.placeholder}
                            style={[styles.input, { color: theme.text}]}
                            value={email}
                            onChangeText={(digitado) => setEmail(digitado)}
                        />
                        <TextInput
                            placeholder="Senha"
                            placeholderTextColor={theme.placeholder}
                            style={[styles.input, { color: theme.text}]}
                            secureTextEntry={true}
                            value={senha}
                            onChangeText={(digitado) => setSenha(digitado)}
                        />
                        <Text style={[styles.textToggle, { color: theme.text }]} onPress={toggleForm}>
                            Já tem uma conta? Faça login
                        </Text>
                        <TouchableOpacity style={[styles.btn, { backgroundColor: theme.backgroundButton }]} onPress={RealizaCadastro}>
                            <Text style={[styles.btnText, { color: 'white' }]}>CADASTRAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.containerLogin}>
                    <View style={styles.containerInput}>
                        <View style={styles.containerIcon}>
                            <FontAwesome6 name="user-large" size={40} color={theme.text} />
                            <Text style={[styles.loginText, { color: theme.text }]}>LOGIN</Text>
                        </View>
                        <TextInput
                            placeholder="Insira seu email..."
                            placeholderTextColor={theme.placeholder}
                            style={[styles.input, { color: theme.text}]}
                            value={email}
                            onChangeText={(digitado) => setEmail(digitado)}
                        />
                        <TextInput
                            placeholder="Insira sua senha..."
                            placeholderTextColor={theme.placeholder}
                            style={[styles.input, { color: theme.text}]}
                            secureTextEntry={true}
                            value={senha}
                            onChangeText={(digitado) => setSenha(digitado)}
                        />
                        <Text style={[styles.textToggle, { color: theme.secondary }]} onPress={toggleForm}>
                            Não tem uma conta? Cadastre-se
                        </Text>
                        <TouchableOpacity style={[styles.btn, { backgroundColor: theme.backgroundButton }]} onPress={RealizaLogin}>
                            <Text style={[styles.btnText, { color: 'white' }]}>ENTRAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {error && (
                <View>
                    <Text style={[styles.textError, { color: 'red' }]}>Revise os campos. Tente novamente</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: 1,
    },
    btnText: {
        lineHeight: 45,
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
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    containerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 10,
    },
    textError: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    textSlogan: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    textToggle: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        textDecorationLine: 'underline',
        fontSize: 18,
        padding: 10,
        borderRadius: 5,
    },
});
