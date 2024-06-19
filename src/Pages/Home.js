import React, { useEffect, useRef, useState, useContext } from 'react';
import { ActivityIndicator, Animated, FlatList, Image, StyleSheet, Text, Switch, View, TouchableOpacity } from 'react-native';
import Pessoa from '../Components/Pessoa';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Context/AuthContext'; // Importando o contexto de autenticação

export default function Home() {
    const { theme, toggleTheme, Logout } = useContext(AuthContext);

    const [pessoas, setPessoas] = useState([]);
    const [error, setError] = useState(false);
    const flatListRef = useRef(null);
    const [userName, setUserName] = useState('');

    function RealizaLogout(){
        Logout()
    }
    useFocusEffect(
        React.useCallback(() => {
            async function fetchPessoas() {
                try {
                    const res = await fetch('http://10.139.75.46:5000/api/Pessoa/GetAllPessoasStatus1', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
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

            // Chama a função fetchPessoas
            fetchPessoas();
        }, [])
    );

    useEffect(() => {
        async function fetchUserName() {
            try {
                const storedUserName = await AsyncStorage.getItem('userName');
                setUserName(storedUserName || '');
            } catch (error) {
                console.error("Failed to fetch user name:", error);
            }
        }

        fetchUserName();
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
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/Logo.png')}
                        style={styles.logo}
                    />
                </View>
                <View style={styles.welcomeContainer}>
                    <Text style={[styles.welcomeText, { color: theme.primary }]}>
                        {userName ? `Bem-vindo, ` : 'Carregando...'}
                        <Text style={{ color: theme.textName, textDecorationLine: 'underline' }}>
                            {userName}
                        </Text>
                        {userName ? `!` : ''}
                    </Text>
                    {userName && (
                        <TouchableOpacity>
                            <MaterialCommunityIcons
                            name="exit-to-app"
                            size={24}
                            color={theme.primary}
                            style={styles.exitIcon}
                            onPress={RealizaLogout}
                        />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <Text style={[styles.textPessoas, { color: theme.primary }]}>PESSOAS DESAPARECIDAS</Text>
            <View style={styles.switchContainer}>
                <MaterialIcons name="wb-sunny" size={24} color={theme.primary} style={styles.icon} />
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleTheme}
                    value={theme === darkTheme}
                />
                <Ionicons name="moon" size={24} color={theme.primary} style={styles.icon} />
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

const lightTheme = {
    primary: '#4654A3',
    secondary: '#4654A3',
    background: '#F3EFE4',
    text: '#4654A3',
};

const darkTheme = {
    primary: '#F3EFE4',
    secondary: '#F3EFE4',
    background: '#000B1D',
    text: '#F3EFE4',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 50,
    },
    logoContainer: {
        marginRight: 20,
    },
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    welcomeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    welcomeText: {
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 28,
        marginVertical: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        // Removendo sombra
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    exitIcon: {
        marginLeft: 10,
    },
    textPessoas: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginVertical: 20,
        width: '80%'
    },
    listContainer: {
        flex: 1,
        width: '80%',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    icon: {
        marginHorizontal: 10,
    },
});
