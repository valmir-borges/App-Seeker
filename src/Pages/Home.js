import { ActivityIndicator, Button, FlatList, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import React, { useEffect, useRef, useState } from 'react';
import Produto from "../Components/Produto";
import { FontAwesome5 } from '@expo/vector-icons';

export default function Home(){

    const [produtos, setProdutos] = useState([]);
    const [error, setError] = useState(false);
    const flatListRef = useRef(null);

    async function getProdutos(){
        await fetch('https://fakestoreapi.com/products' , {
            method: 'GET',//método get que pega as informações, não precisa passar ele, mas é uma boa prática
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res=>(res.ok == true) ? res.json() : false)
        .then(json=> setProdutos(json))
        .catch(err => setError(true))
    }
    useEffect(()=> {
        getProdutos();
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={styles.logo}
                />
            </View>
            <View>
            <View style={styles.textContainer}>
                <FontAwesome5 name="shopping-cart" size={24} color="#FF7A00" style={styles.icon} />
                <Text style={styles.textProdutos}>PRODUTOS</Text>
                <FontAwesome5 name="shopping-cart" size={24} color="#FF7A00" style={styles.icon} />
            </View>
                {produtos.length > 0 ?//Se o array de produtos for maior que 0, significa que há produtos
                    <FlatList
                        data={produtos}
                        renderItem={({item}) => <Produto item={item}/>}
                        ref={flatListRef}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.flatList}
                        contentContainerStyle={styles.flatListProdutos}
                    />
                    :
                    <ActivityIndicator size="large" color="white"/>
                }
            </View>
        </View>
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
    textProdutos: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        color: '#FF7A00'
    },
    boxProduto: {
        backgroundColor: 'white',
        marginTop: 50,
        borderRadius: 20,
        padding: 20
    },
    imagemProduto: {
        width: '100%', 
        height: 200,
        resizeMode: 'stretch',
      },
      textoEsquerda: {
        textAlign: 'center',
        color: '#333',
        marginBottom: 10,
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 20,
        textDecorationLine: 'underline'
    },
    textoDireita: {
        textAlign: 'center',
        color: '#000B1D',
        fontSize: 20,
    },
    flatListProdutos:{
        padding: 40
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10 // ajuste conforme necessário
    },
    icon: {
        marginRight: 10, // ajuste conforme necessário
        marginLeft: 10
    }
    
})