import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Modal, Button, TextInput, Alert, ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function Pessoa({ item, index }) {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [observacaoModalVisivel, setObservacaoModalVisivel] = useState(false);
  const [observacao, setObservacao] = useState(item.pessoaObservacao || '');
  const [observacaoInput, setObservacaoInput] = useState('');

  const [mostrarSelecionarData, setMostrarSelecionarData] = useState(false);

  //ESTADOS PARA CRIAR UMA OBSERVAÇÃO
  const [descricaoObservacao, setDescricaoObservacao] = useState('')
  const [localObservacao, setLocalObservacao] = useState('');
  const [dataObservacao, setDataObservacao] = useState(new Date());

  async function CadastrarObservacao() {
    const usuarioId = await AsyncStorage.getItem('userId');
    await fetch('http://10.139.75.46:5251/api/Observacoes/CreateObservacao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        observacoesDescricao: descricaoObservacao,
        observacoesLocal: localObservacao,
        observacoesData: dataObservacao,
        pessoaId: item.pessoaId,
        usuarioId: usuarioId
      })
    })
      .then(res => {
        if (res.status == 200) {
          Alert.alert('Observação cadastrada com sucesso');
          setObservacaoModalVisivel(false);
        } else {
          Alert.alert('Erro ao cadastrar observação');
        }
      })
      .catch(err => Alert.alert('Erro ao cadastrar observação'));
  }

  return (
    <View>
      <View style={styles.boxPessoa}>
        <Image source={{ uri: item.pessoaFoto }} style={styles.imagemPessoa} />
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
          <Text style={styles.textoValue}>{item.pessoaNome}</Text>
        </View>
        <TouchableOpacity style={styles.botao} onPress={() => setModalVisivel(true)}>
          <Ionicons name="add-circle-outline" size={32} color="#4654A3" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {
          setModalVisivel(!modalVisivel);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { width: '95%' }]}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Image source={{ uri: item.pessoaFoto }} style={styles.imagemPessoaModal} />
              <Text style={styles.modalText}><Text style={styles.modalTitle}>Nome:</Text> {item.pessoaNome}</Text>
              <Text style={styles.modalText}><Text style={styles.modalTitle}>Idade:</Text> {item.pessoaIdade}</Text>
              <Text style={styles.modalText}><Text style={styles.modalTitle}>Roupa:</Text> {item.pessoaRoupa}</Text>
              <Text style={styles.modalText}><Text style={styles.modalTitle}>Cor:</Text> {item.pessoaCor}</Text>
              <Text style={styles.modalText}><Text style={styles.modalTitle}>Sexo:</Text> {item.pessoaSexo}</Text>
              <Text style={styles.modalText}><Text style={styles.modalTitle}>Local de Desaparecimento:</Text> {item.pessoaLocalDesaparecimento}</Text>
              <Text style={styles.modalText}><Text style={styles.modalTitle}>Data de Encontro:</Text> {item.pessoaDtEncontro}</Text>
              <Text style={styles.modalText}><Text style={styles.modalTitle}>Data de Desaparecimento:</Text> {item.pessoaDtDesaparecimento}</Text>
              <Text style={styles.modalText}><Text style={styles.modalTitle}>Status:</Text> {item.pessoaStatus}</Text>
            </ScrollView>

            <View style={styles.modalButtons}>
              <Button
                title="Cadastrar Observação"
                onPress={() => setObservacaoModalVisivel(true)}
                color="#4654A3"
              />
              <View style={{ marginVertical: 5 }} />
              <Button
                title="Fechar"
                onPress={() => setModalVisivel(!modalVisivel)}
                color="#4654A3"
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={observacaoModalVisivel}
        onRequestClose={() => {
          setObservacaoModalVisivel(!observacaoModalVisivel);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { width: '95%' }]}>
            <Text style={styles.modalText}><Text style={styles.modalTitle}>Nova Observação</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Escreva sua observação"
              value={descricaoObservacao}
              onChangeText={(digitado) => setDescricaoObservacao(digitado)}
            />
            <TextInput
              style={styles.input}
              placeholder="Escreva o Local da observação"
              value={localObservacao}
              onChangeText={(digitado) => setLocalObservacao(digitado)}
            />
            {mostrarSelecionarData && ( // Condicionalmente renderizado
              <DateTimePicker
                value={dataObservacao}
                mode='date'
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || dataObservacao;
                  setDataObservacao(currentDate);
                  setMostrarSelecionarData(false); // Fechar o picker após selecionar uma data
                }}
              />
            )}
            {!mostrarSelecionarData && ( // Botão para abrir o DateTimePicker
              <Button
                title="Selecionar Data"
                onPress={() => setMostrarSelecionarData(true)}
                color="#4654A3"
              />
            )}
            <View style={styles.modalButtons}>
              <Button
                title="Salvar Observação"
                onPress={CadastrarObservacao}
                color="#4654A3"
              />
              <View style={{ marginVertical: 5 }} />
              <Button
                title="Fechar"
                onPress={() => setObservacaoModalVisivel(!observacaoModalVisivel)}
                color="#4654A3"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  boxPessoa: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imagemPessoa: {
    width: '100%',
    height: 200,
    resizeMode: 'stretch',
  },
  imagemPessoaModal: {
    width: 200, // Ou defina a largura de acordo com o layout desejado
    height: 200, // Ou defina a altura de acordo com o layout desejado
    resizeMode: 'stretch',
    marginBottom: 20, // Espaçamento abaixo da imagem no modal
  },
  textoValue: {
    textAlign: 'center',
    color: '#000B1D',
    fontSize: 20,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '80%', // Limitar a altura máxima do modal
    width: '95%', // Aumentar a largura do modal
  },
  modalContent: {
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    color: '#000B1D',
  },
  modalTitle: {
    fontWeight: 'bold',
    color: '#4654A3',
    fontSize: 20,
  },
  modalButtons: {
    marginTop: 20,
    width: '80%', // Alinhamento centralizado dos botões
  },
  botao: {
    position: 'absolute',
    bottom: 3,
    right: 10,
    padding: 10,
    borderRadius: 5,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '80%',
  },
});
