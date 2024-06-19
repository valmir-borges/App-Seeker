import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from '../Context/AuthContext'; // Importe o contexto de tema aqui

export default function Busca() {
    const { theme } = useContext(AuthContext); // Obtendo o tema do contexto

    const [pessoas, setPessoas] = useState([]);
    const [busca, setBusca] = useState('');
    const [error, setError] = useState(false);
    const [filtro, setFiltro] = useState('');

    async function getPessoas() {
        await fetch('http://10.139.75.46:5000/api/Pessoa/GetAllPessoas', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => (res.ok === true) ? res.json() : false)
            .then(json => setPessoas(json))
            .catch(err => setError(true));
    }

    useEffect(() => {
        getPessoas();
    }, []);

    useEffect(() => {
        setFiltro(pessoas.find((pessoa) => pessoa.pessoaNome.toLowerCase() === busca.toLowerCase()));
    }, [busca, pessoas]);

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.containerLogo}>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Buscar..."
                    style={[styles.inputBusca, { color: theme.placeholder }]}
                    value={busca}
                    onChangeText={(digitado) => setBusca(digitado)}
                    placeholderTextColor={theme.placeholder}
                />
                <Ionicons name="search" size={24} color={theme.placeholder} style={styles.icon} />
            </View>
            <View style={styles.containerUsers}>
                <View style={styles.textContainer}>
                    <FontAwesome5 name="users" size={24} color={theme.text} style={styles.iconUser} />
                    <Text style={[styles.Users, { color: theme.text }]}>PESSOAS</Text>
                </View>
                {busca !== '' ? (
                    filtro ? (
                        <View style={[styles.card, { backgroundColor: theme.cardBackground, borderWidth: 1, borderColor: theme.border}]}>
                            <View style={styles.cardTop}>
                                <FontAwesome
                                    name="user-circle"
                                    size={60}
                                    color={theme.text}
                                />
                            </View>
                            <View style={styles.cardBottom}>
                                <View style={styles.textContainer}>
                                    <Text style={[styles.textEsquerda, {color: theme.textName}]}>NOME:</Text>
                                    <Text style={[styles.cardText, { color: theme.text }]}>{filtro.pessoaNome}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={[styles.textEsquerda, {color: theme.textName}]}>STATUS:</Text>
                                    <Text style={[styles.cardText, { color: theme.text }]}>
                                        {filtro.pessoaStatus === 1 ? "DESAPARECIDO" : "ENCONTRADO"}
                                    </Text>                                
                                </View>
                            </View>
                        </View>
                    ) : (
                        <ActivityIndicator size="large" color={theme.text} style={styles.iconeActivy} />
                    )
                ) : null}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    containerLogo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
        marginTop: 20
    },
    logoText: {
        color: 'white',
        fontSize: 30,
        marginLeft: 10,
        fontWeight: 'bold',
        marginBottom: 10
    },
    logo: {
        height: 100,
        width: 100,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    inputBusca: {
        flex: 1,
        height: '100%',
        padding: 10,
    },
    inputContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgba(57, 57, 57, 0.4)',
        padding: 10,
    },
    icon: {
        marginLeft: 10,
    },
    Users: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
    nameUser: {
        color: 'white'
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        padding: 15,
        marginTop: 10,
        width: '100%'
    },
    cardTop: {
        alignItems: 'center',
        marginBottom: 10
    },
    cardBottom: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardText: {
        fontSize: 15,
        fontWeight: 'bold',
        width: '40%',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 5,
    },
    textEsquerda: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 15,
        width: '40%'

    },
    iconeActivy: {
        marginTop: 20
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    iconUser: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10
    }
});
