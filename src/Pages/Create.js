import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList} from "react-native";
import React, { useEffect, useRef, useState } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'; // Importando ícones do Expo

export default function Create(){

    const [usuarios, setUsuarios] = useState([]);
    const [busca,setBusca] = useState('')
    const [ error, setError] = useState(false)
    const [ filtro, setFiltro] = useState('')

    const [userEmail, setEmail] = useState()
    const [userNome, setNome] = useState()
    const [userSenha, setSenha] = useState()
    const [idUser, setIdUser] = useState()
    const [edicao, setEdicao] = useState(false)

    async function getUsuarios(){
        await fetch('http://10.139.75.10:5251/api/Users/GetAllUsers' , {//Pegando todos os usuários e depois vai ser filtrado
            method: 'GET',//método get que pega as informações, não precisa passar ele, mas é uma boa prática
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res=> res.json())
        .then(json=> setUsuarios(json))
        .catch(err => setError(true))
    }

    useEffect(()=> {//No momento que carregar a página será buscado todos os usuários
        getUsuarios();
    }, [])

    useFocusEffect(
        React.useCallback(()=>{
            getUsuarios();
        }, [])
    )

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Usuários</Text>
            {edicao === false ?
                <FlatList
                    style={styles.flat}
                    data={usuarios}
                    keyExtractor={(item) => item.userId.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.box}>
                            <Ionicons name="person-circle-outline" size={60} color="white" style={styles.userIcon} />
                            <Text style={styles.name}>{item.userName}</Text>
                            <Text style={styles.email}>{item.userEmail}</Text>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.btnEdit}>
                                    <Ionicons name="pencil-outline" size={24} color="white" />
                                </TouchableOpacity>
                                <View style={styles.buttonSpacer} />
                                <TouchableOpacity style={styles.btnDelete}>
                                    <Ionicons name="trash-outline" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
                :
                <View/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexfleGrow: 1,
        backgroundColor: '#000B1D',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingTop: 20,
    },
    flat: {
        width: '90%',
        marginLeft: 30,
        marginBottom: 100
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 30
    },
    box: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    userIcon: {
        marginBottom: 20,
    },
    name: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    email: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    btnEdit: {
        backgroundColor: '#FFD700',
        padding: 10,
        borderRadius: 5,
    },
    btnDelete: {
        backgroundColor: '#FF6347',
        padding: 10,
        borderRadius: 5,
    },
    buttonSpacer: {
        width: 10,
    },
})