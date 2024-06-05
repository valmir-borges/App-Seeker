import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Profile(){
    
    const [email, setEmail] = useState('')
    const [primeironome, setPrimeiroNome] = useState('')
    const [ultimonome, setUltimoNome] = useState('')
    const [user, setUser]= useState('')
    const [phone, setPhone] = useState('')
    const [senha, setSenha] = useState('')
    const [rua, setRua] = useState('')
    const [numero, setNumero] = useState('')
    const [cidade, setCidade] = useState('')
    const [cep, setCep] = useState('')

    const [ erro, setErro] =useState(false)
    const [sucesso, setSucesso] = useState(false)

    async function Cadastrar(){
        await fetch('https://fakestoreapi.com/users',{
            method:"POST",
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(
                {
                    email: email,
                    username: user,
                    password: senha,
                    name:{
                        firstname: primeironome,
                        lastname: ultimonome
                    },
                    address:{
                        city: cidade,
                        street: rua,
                        number: numero,
                        zipcode: cep,
                        geolocation:{
                            lat:'-37.3159',
                            long:'81.1496'
                        }
                    },
                    phone: phone
                }
            )
        })
        .then(res=>(res.ok == true) ? res.json() : false)
        .then(json => {
            if (json.id) {//Se o json tiver um id, quer dizer que deu certo
                setSucesso(true);//Portanto sucesso true
                Alert.alert('Sucesso', 'Seu cadastro foi realizado com sucesso!', [
                    {text: 'OK', onPress: () => {//Dentro do alert, quando for clicado no texto Ok
                        //Limpa primeiramete os campos de entrada de dados
                        setEmail('');
                        setPrimeiroNome('');
                        setUltimoNome('');
                        setUser('');
                        setPhone('');
                        setSenha('');
                        setRua('');
                        setNumero('');
                        setCidade('');
                        setCep('');
                        //Posteriormente, o sucesso e o erro vai ser falso, porque agora vai ser cadastrado um novo usuário
                        //Redefinir estados de sucesso e erro
                        setSucesso(false);
                        setErro(false);
                    }}
                ]);
            } else {//Se não vier o id, quer dizer que deu algum erro
                setSucesso(false);//Portanto o alert será de erro
                Alert.alert('Erro', 'Falha ao cadastrar. Por favor, revise os dados e tente novamente.');
            }
        })
        .catch(err => {//Outro erro
            setErro(true);
            Alert.alert('Erro', 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
        });
    }

    return(
        <ScrollView contentContainerStyle={styles.container}>
            {sucesso ? //Quando tiver sucesso, irá aparecer somente a mensagem de sucesso
            <View style={styles.successContainer}>
                <FontAwesome5 name="check-circle" size={24} color="green" style={styles.successIcon} />
                <Text style={styles.textSucesso}>Obrigado por se cadastrar. Seu cadastro foi realizado com sucesso!</Text>
            </View>
            : //Caso contrário irá aparecer o form
                <>
                    <View style={styles.containerLogo}>
                <Image
                    source={require('../../assets/Logo.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.containerTitle}>
                <FontAwesome5 name="user-plus" size={30} color="white" style={styles.icon} />
                <Text style={styles.textTitle}>
                    CADASTRAR{'\n'}
                    USUÁRIO
                </Text>
            </View>
            <View style={[styles.inputContainer, {color: 'white'}]}>
                <TextInput
                    placeholder="Insira o seu primeiro nome..."
                    style={styles.inputBusca}
                    placeholderTextColor="white"
                    value={primeironome}
                    textInput={primeironome} 
                    onChangeText={(digitado) => setPrimeiroNome(digitado)}
                />
                <TextInput
                    placeholder="Insira o seu sobrenome..."
                    style={styles.inputBusca}
                    placeholderTextColor="white"
                    value={ultimonome}
                    textInput={ultimonome} 
                    onChangeText={(digitado) => setUltimoNome(digitado)}
                />
                <TextInput
                    placeholder="Insira o seu sobrenome..."
                    style={styles.inputBusca}
                    placeholderTextColor="white"
                    value={user}
                    textInput={user} 
                    onChangeText={(digitado) => setUser(digitado)}
                />
                <TextInput
                    placeholder="Insira o seu email..."
                    style={styles.inputBusca}
                    placeholderTextColor="white"
                    value={email}
                    textInput={email} 
                    onChangeText={(digitado) => setEmail(digitado)}
                />
                <TextInput
                    placeholder="Insira o seu telefone..."
                    style={styles.inputBusca}
                    placeholderTextColor="white"
                    value={phone}
                    textInput={phone} 
                    onChangeText={(digitado) => setPhone(digitado)}
                />
                <TextInput
                    placeholder="Insira o seu cep..."
                    style={styles.inputBusca}
                    placeholderTextColor="white"
                    value={cep}
                    textInput={cep} 
                    onChangeText={(digitado) => setCep(digitado)}
                />
                <TextInput
                    placeholder="Insira a sua cidade..."
                    style={styles.inputBusca}
                    placeholderTextColor="white"
                    value={cidade}
                    textInput={cidade} 
                    onChangeText={(digitado) => setCidade(digitado)}
                />
                <TextInput
                    placeholder="Insira a sua rua..."
                    style={styles.inputBusca}
                    placeholderTextColor="white"
                    value={rua}
                    textInput={rua} 
                    onChangeText={(digitado) => setRua(digitado)}
                />
                <TextInput
                    placeholder="Insira o seu número..."
                    style={styles.inputBusca}
                    placeholderTextColor="white"
                    value={numero}
                    textInput={numero} 
                    onChangeText={(digitado) => setNumero(digitado)}
                />
                <TextInput
                    placeholder="Insira o sua senha..."
                    style={styles.inputBusca}
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    value={senha}
                    textInput={senha} 
                    onChangeText={(digitado) => setSenha(digitado)}
                />
                <TouchableOpacity style={styles.btn} onPress={Cadastrar}>
                    <Text style={styles.btnText}>CADASTRAR</Text>
                </TouchableOpacity>
                {erro && <Text style={styles.textErro}>Revise cuidadosamente os dados!</Text>}
            </View>
                </>
            }        
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
        flex: 1,
        width: '100%',
        padding: 10,
        color: 'white',
        borderRadius: 10,
        padding: 15,
        backgroundColor: 'rgba(57, 57, 57, 0.5)',
    },
    inputContainer: {
        width: '90%',
        flexDirection: 'column',
        gap: 15,
        alignItems: 'center',
        marginBottom: 20
    },
    btn: {
        width: "70%",
        height: 50,
        borderRadius: 10,
        backgroundColor: "transparent",
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: 1,
        borderColor: 'white',
    },
    btnText: {
        lineHeight: 45,
        color: "white",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        alignContent: "center",
        fontSize: 25,
        fontWeight: "bold",
    },
    containerTitle: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20 // ajuste conforme necessário
    },
    icon: {
        marginBottom: 2,
        marginRight: 10, // Espaço entre o ícone e o texto
    },
    textTitle: {
        fontSize: 28,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 2,
        marginLeft: 10, // Espaço entre o texto e o ícone
    },
    textErro: {
        textAlign: 'center',
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold'
    },
    textSucesso: {
        color: 'black',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%'
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
        borderRadius: 10
    },
    successIcon: {
        marginRight: 10,
    },
})