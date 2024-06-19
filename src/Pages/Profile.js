import React, { useState, useContext } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importação do DateTimePicker
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Context/AuthContext'; // Importação do contexto de autenticação

export default function Profile() {
    const { theme } = useContext(AuthContext); // Obtendo o tema do contexto

    const [nome, setNome] = useState('');
    const [roupa, setRoupa] = useState('');
    const [cor, setCor] = useState('');
    const [sexo, setSexo] = useState('');
    const [observacao, setObservacao] = useState('');
    const [localDesaparecimento, setLocalDesaparecimento] = useState('');
    const [foto, setFoto] = useState('');
    const [dataDesaparecimento, setDataDesaparecimento] = useState(new Date()); // Estado para armazenar a data de desaparecimento
    const [dataEncontro, setDataEncontro] = useState('');

    const [mostrarSelecionarData, setMostrarSelecionarData] = useState(false); // Estado para controlar a exibição do DateTimePicker

    const [erro, setErro] = useState(false);
    const [sucesso, setSucesso] = useState(false);

    const formatarData = (data) => {
        return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    async function CadastrarPessoa() {
        const usuarioId = await AsyncStorage.getItem('userId');
        await fetch('http://10.139.75.46:5000/api/Pessoa/InsertPessoa', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pessoaNome: nome,
                pessoaRoupa: roupa,
                pessoaCor: cor,
                pessoaSexo: sexo,
                pessoaObservacao: observacao,
                pessoaLocalDesaparecimento: localDesaparecimento,
                pessoaFoto: foto,
                pessoaDtEncontro: dataDesaparecimento, // Ajustado para dataEncontro
                pessoaDtDesaparecimento: dataDesaparecimento,
                pessoaStatus: 1,
                usuarioId: usuarioId
            })
        })
        .then(res => {
            if (res.status === 200) {
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
                setNome('');
                setRoupa('');
                setCor('');
                setSexo('');
                setObservacao('');
                setLocalDesaparecimento('');
                setFoto('');
                setDataEncontro(new Date()); // Reinicia a data de encontro para o valor padrão
                setDataDesaparecimento(new Date()); // Reinicia a data de desaparecimento para o valor padrão
            } else {
                throw new Error('Erro ao cadastrar pessoa');
            }
        })
        .catch(err => {
            Alert.alert('Erro', 'Erro ao cadastrar pessoa. Verifique os campos e tente novamente.');
            console.error(err);
        });
    }
    
    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.containerLogo}>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.containerTitle}>
                <FontAwesome5 name="user-plus" size={30} color={theme.primary} style={styles.icon} />
                <Text style={[styles.textTitle, { color: theme.primary }]}>
                    CADASTRAR{'\n'}
                    PESSOA
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Insira o nome da pessoa..."
                    style={[styles.input, { backgroundColor: 'rgba(57, 57, 57, 0.4)', color: theme.text }]}
                    placeholderTextColor={theme.placeholder}
                    value={nome}
                    onChangeText={(digitado) => setNome(digitado)}
                />
                <TextInput
                    placeholder="Insira a roupa da pessoa..."
                    style={[styles.input, { backgroundColor: 'rgba(57, 57, 57, 0.4)', color: theme.text }]}
                    placeholderTextColor={theme.placeholder}
                    value={roupa}
                    onChangeText={(digitado) => setRoupa(digitado)}
                />
                <TextInput
                    placeholder="Insira a cor da pessoa..."
                    style={[styles.input, { backgroundColor: 'rgba(57, 57, 57, 0.4)', color: theme.text }]}
                    placeholderTextColor={theme.placeholder}
                    value={cor}
                    onChangeText={(digitado) => setCor(digitado)}
                />
                <TextInput
                    placeholder="Insira o sexo da pessoa..."
                    style={[styles.input, { backgroundColor: 'rgba(57, 57, 57, 0.4)', color: theme.text }]}
                    placeholderTextColor={theme.placeholder}
                    value={sexo}
                    onChangeText={(digitado) => setSexo(digitado)}
                />
                <TextInput
                    placeholder="Insira a observação..."
                    style={[styles.input, { backgroundColor: 'rgba(57, 57, 57, 0.4)', color: theme.text }]}
                    placeholderTextColor={theme.placeholder}
                    value={observacao}
                    onChangeText={(digitado) => setObservacao(digitado)}
                />
                <TextInput
                    placeholder="Insira o local de desaparecimento"
                    style={[styles.input, { backgroundColor: 'rgba(57, 57, 57, 0.4)', color: theme.text }]}
                    placeholderTextColor={theme.placeholder}
                    value={localDesaparecimento}
                    onChangeText={(digitado) => setLocalDesaparecimento(digitado)}
                />
                <TextInput
                    placeholder="Insira a foto da pessoa..."
                    style={[styles.input, { backgroundColor: 'rgba(57, 57, 57, 0.4)', color: theme.text }]}
                    placeholderTextColor={theme.placeholder}
                    value={foto}
                    onChangeText={(digitado) => setFoto(digitado)}
                />
                <TouchableOpacity onPress={() => setMostrarSelecionarData(true)}>
                    <TextInput
                        placeholder="Selecione a data de desaparecimento"
                        style={[styles.input, { backgroundColor: 'rgba(57, 57, 57, 0.4)', color: theme.text }]}
                        placeholderTextColor={theme.placeholder}
                        value={formatarData(dataDesaparecimento)}
                        editable={false}
                    />
                </TouchableOpacity>
                {mostrarSelecionarData && ( // Condicionalmente renderizado
                    <DateTimePicker
                        value={dataDesaparecimento}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || dataDesaparecimento;
                            setDataDesaparecimento(currentDate);
                            setMostrarSelecionarData(false); // Fechar o picker após selecionar uma data
                        }}
                    />
                )}
                {sucesso && (
                    <View style={styles.successContainer}>
                        <FontAwesome5 name="check-circle" size={20} color="green" style={styles.successIcon} />
                        <Text style={styles.textSucesso}>Cadastro realizado com sucesso!</Text>
                    </View>
                )}
                {erro && (
                    <Text style={styles.textErro}>Erro ao cadastrar pessoa. Verifique os campos e tente novamente.</Text>
                )}
                <TouchableOpacity style={styles.btn} onPress={CadastrarPessoa}>
                    <Text style={styles.btnText}>CADASTRAR</Text>
                </TouchableOpacity>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
        marginTop: 50,
    },
    logo: {
        height: 100,
        width: 100,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius:
        10,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    inputContainer: {
        width: '90%',
        flexDirection: 'column',
        gap: 15,
        alignItems: 'center',
        marginBottom: 20,
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
        borderColor: '#4654A3', // borda igual a cor do fundo do botão
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    containerTitle: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20, // ajuste conforme necessário
    },
    icon: {
        marginBottom: 2,
        marginRight: 10, // Espaço entre o ícone e o texto
    },
    textTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 2,
        marginLeft: 10, // Espaço entre o texto e o ícone
    },
    textErro: {
        textAlign: 'center',
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
    },
    textSucesso: {
        color: 'black',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
    },
    successContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 100,
        width: '90%',
        borderRadius: 10,
    },
});
