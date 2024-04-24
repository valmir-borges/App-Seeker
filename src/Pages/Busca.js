import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import React, { useEffect, useState } from 'react';
import { Ionicons, FontAwesome} from '@expo/vector-icons';

export default function Busca(){

    const [usuarios, setUsuarios] = useState([]);
    const [busca,setBusca] = useState('')
    const [ error, setError] = useState(false)
    const [ filtro, setFiltro] = useState('')

    async function getUsuarios(){
        await fetch('https://fakestoreapi.com/users' , {//Pegando todos os usuários e depois vai ser filtrado
            method: 'GET',//método get que pega as informações, não precisa passar ele, mas é uma boa prática
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res=>(res.ok == true) ? res.json() : false)
        .then(json=> setUsuarios(json))
        .catch(err => setError(true))
    }

    useEffect(()=> {//No momento que carregar a página será buscado todos os usuários
        getUsuarios();
    }, [])

    useEffect(()=>{//Toda vez que a variável busca for alterada, ou seja, toda vez que o usuário digitar algo, iremos filtrar os usuários
        //Iremos filtrar os usuários a partir do que é digitado
        setFiltro(usuarios.filter((usuario) => usuario.name.firstname == busca)[0])
        //Está sendo pego somente quando o que for digitado for 100% igual ao primeiro nome
        console.log(filtro)
    }, [busca])

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.containerLogo}>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={styles.logo}
                />
            </View>
            <View style={[styles.inputContainer, {color: 'white'}]}>
                <TextInput
                    placeholder="Buscar..."
                    style={styles.inputBusca}
                    value={busca}
                    onChangeText={(digitado) => setBusca(digitado)}
                    placeholderTextColor="white"
                />
                <Ionicons name="search" size={24} color="white" style={styles.icon} />
            </View>
            <View style={styles.containerUsers}>
                <Text style={styles.Users}>USUÁRIOS</Text>
                {busca !== '' ? (
                    filtro ? (
                        <View style={styles.card}>
                            <View style={styles.cardTop}>
                                <FontAwesome
                                    name="user-circle"
                                    size={60}
                                    color='black'
                                />
                            </View>
                            <View style={styles.cardBottom}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.textEsquerda}>NOME:</Text>
                                    <Text style={styles.cardText}>{filtro.name.firstname}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.textEsquerda}>EMAIL:</Text>
                                    <Text style={styles.cardText}>{filtro.email}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.textEsquerda}>TELEFONE:</Text>
                                    <Text style={styles.cardText}>{filtro.phone}</Text>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <ActivityIndicator size="large" color="white" style={styles.iconeActivy}/>
                    )
                ) : null}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#000B1D',
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
        flex: 1, // Adicione esta linha
        height: '100%', // Altere de '6%' para '100%'
        padding: 10,
        color: 'white'
    },
    inputContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgba(57, 57, 57, 0.5)',
        padding: 10,
    },
    icon: {
        marginLeft: 10,
    },
    Users: {
        fontSize: 30,
        color: 'white',
        fontWeight:'bold',
        textAlign: 'center',
        marginTop: 10
    },
    nameUser: {
        color: 'white'
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        width: '70%'
    },
    cardTop: {
        alignItems: 'center',
        marginBottom: 10
    },
    cardBottom: {
        alignItems: 'center',
    },
    cardText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
    },
    textEsquerda: {
        color: '#FFDB58',
        textAlign: 'left',
        width: '45%',
        fontWeight: 'bold'
    },
    iconeActivy: {
        marginTop: 20
    }
})