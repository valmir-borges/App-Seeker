import { ActivityIndicator, Animated, FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from 'react';
import Pessoa from "../Components/Pessoa";
import { useFocusEffect } from "@react-navigation/native";

export default function Home() {
    const [pessoas, setPessoas] = useState([]);
    const [error, setError] = useState(false);
    const flatListRef = useRef(null);

    async function getPessoas() {
        try {
            const res = await fetch('http://10.139.75.46:5251/api/Pessoa/GetAllPessoas', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            });
            if (res.ok) {
                const json = await res.json();
                setPessoas(json);
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        }
    }

    useEffect(() => {
        getPessoas();
    }, []);

    const fade = useRef(new Animated.Value(0)).current;

    useFocusEffect(
        React.useCallback(() => {
            fade.setValue(0);
            Animated.timing(fade, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }).start();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textPessoas}>PESSOAS DESAPARECIDAS</Text>
            </View>
            <View style={styles.listContainer}>
                {pessoas.length > 0 ? (
                    <Animated.View style={[{ opacity: fade }]}>
                        <FlatList
                            data={pessoas}
                            renderItem={({ item }) => <Pessoa item={item} />}
                            ref={flatListRef}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </Animated.View>
                ) : (
                    <ActivityIndicator size="large" color="white" />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3EFE4',
        alignItems: 'center',
        width: '100%',
    },
    containerLogo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
        marginTop: 20
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    textPessoas: {
        textAlign: 'center',
        color: '#4654A3',
        fontWeight: 'bold',
        fontSize: 30,
        width: '80%'
    },
    listContainer: {
        flex: 1,
        width: '80%',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    }
});
