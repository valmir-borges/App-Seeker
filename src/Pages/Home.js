import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, FlatList, Image, StyleSheet, Text, Switch, View } from 'react-native';
import Pessoa from '../Components/Pessoa';
import { useFocusEffect } from '@react-navigation/native';
import { lightTheme, darkTheme } from '../Color'; // Importe os temas
import { MaterialIcons, Ionicons } from '@expo/vector-icons'; // Importe os ícones corretos

// Importe as imagens da logo
import LogoClara from '../../assets/Logo.png';
import LogoEscura from '../../assets/Logo-Escura.png';

export default function Home() {
    const [pessoas, setPessoas] = useState([]);
    const [error, setError] = useState(false);
    const flatListRef = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(false); // Estado para controlar o modo claro/escuro
    const [logoImage, setLogoImage] = useState(LogoClara); // Estado para controlar a imagem da logo

    async function getPessoas() {
        try {
            const res = await fetch('http://10.139.75.46:5251/api/Pessoa/GetAllPessoasStatus1', {
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

    useEffect(() => {
        // Atualiza a imagem da logo com base no tema selecionado
        setLogoImage(isDarkMode ? LogoEscura : LogoClara);
    }, [isDarkMode]);

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

    const theme = isDarkMode ? darkTheme : lightTheme; // Seleciona o tema com base no modo

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.containerLogo}>
                <Image
                    source={logoImage} // Usa o estado logoImage para escolher a imagem
                    style={styles.logo}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.textPessoas, { color: theme.primary }]}>PESSOAS DESAPARECIDAS</Text>
                <View style={styles.switchContainer}>
                    <Ionicons name="moon" size={24} color={theme.primary} style={styles.icon} />
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setIsDarkMode(!isDarkMode)}
                        value={isDarkMode}
                    />
                    <MaterialIcons name="wb-sunny" size={24} color={theme.primary} style={styles.icon} />
                </View>
            </View>
            <View style={styles.listContainer}>
                {pessoas.length > 0 ? (
                    <Animated.View style={{ opacity: fade }}>
                        <FlatList
                            data={pessoas}
                            renderItem={({ item }) => <Pessoa item={item} />}
                            ref={flatListRef}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </Animated.View>
                ) : (
                    <ActivityIndicator size="large" color={theme.primary} />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerLogo: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    textPessoas: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginVertical: 20,
    },
    listContainer: {
        flex: 1,
        width: '80%',
    },
    textContainer: {
        alignItems: 'center',
        width: '80%',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginHorizontal: 10,
    },
});
