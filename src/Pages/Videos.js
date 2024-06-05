import { Image, ScrollView, Share, StyleSheet, Text, View } from "react-native";
import React from 'react';
import { Entypo } from '@expo/vector-icons';

export default function Videos(){

    async function onShare(){
        try{
            const result = await Share.share({
                message: 'React Native'//Aqui vai o texto que vai ser compartilhado
            });
            console.log(result)
        }
        catch(error){
            Alert(error.message)
        }
    }
    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.containerLogo}>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.videoBox}>
                <Text>Aqui vai ser o vídeo</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.shareButton}>
                    <Entypo name="share" size={32} color="black" onPress={onShare} />            
                </View>
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
    videoBox: {
        backgroundColor: 'white',
        width: '90%',
        minHeight: 200,
        marginBottom: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        width: '90%',
        alignItems: 'center',
    },
    shareButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 50,
    }
})
