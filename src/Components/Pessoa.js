import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Modal, Button, TextInput, Alert, ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../Context/AuthContext'; // Importe o contexto aqui

export default function Pessoa({ item, index }) {
  const { theme } = useContext(AuthContext); // Obtendo o tema do contexto

  const [modalVisivel, setModalVisivel] = useState(false);
  const [observacaoModalVisivel, setObservacaoModalVisivel] = useState(false);
  const [observacao, setObservacao] = useState(item.pessoaObservacao || '');
  const [observacaoInput, setObservacaoInput] = useState('');
  const [observacoes, setObservacoes] = useState([]);
  const [mostrarSelecionarData, setMostrarSelecionarData] = useState(false);
  const [descricaoObservacao, setDescricaoObservacao] = useState('');
  const [localObservacao, setLocalObservacao] = useState('');
  const [dataObservacao, setDataObservacao] = useState(new Date());

  useEffect(() => {
    if (modalVisivel) {
      buscarObservacoes();
    }
  }, [modalVisivel]);

  async function buscarObservacoes() {
    try {
      const response = await fetch(`http://10.139.75.46:5000/api/Observacoes/GetByIdPessoa/${item.pessoaId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      });
      if (response.ok) {
        const json = await response.json();
        setObservacoes(json);
      } else {
        console.error('Erro ao buscar observações:', response.status);
        Alert.alert('Erro', 'Erro ao buscar observações');
      }
    } catch (error) {
      console.error('Erro ao buscar observações:', error);
      Alert.alert('Erro', 'Erro ao buscar observações');
    }
  }

  async function CadastrarObservacao() {
    try {
      const usuarioId = await AsyncStorage.getItem('userId');
      const response = await fetch('http://10.139.75.46:5000/api/Observacoes/CreateObservacao', {
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
      });
      if (response.ok) {
        Alert.alert('Observação cadastrada com sucesso');
        setObservacaoModalVisivel(false);
        buscarObservacoes(); // Atualiza a lista de observações após cadastrar uma nova
      } else {
        Alert.alert('Erro ao cadastrar observação');
      }
    } catch (error) {
      console.error('Erro ao cadastrar observação:', error);
      Alert.alert('Erro', 'Erro ao cadastrar observação');
    }
  }

  return (
    <View>
      <View style={[styles.boxPessoa, { borderColor: theme.border , borderWidth: 1 }]}>
        <Image source={{ uri: item.pessoaFoto }} style={styles.imagemPessoa} />
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
          <Text style={[styles.textoValue, { color: theme.text }]}>
            {item.pessoaNome}
          </Text>
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
        onShow={buscarObservacoes} // Chama a função ao abrir o modal
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Image source={{ uri: item.pessoaFoto }} style={styles.imagemPessoaModal} />
              <Text style={[styles.modalText, { color: theme.text }]}>
                <Text style={styles.modalTitle}>Nome:</Text> {item.pessoaNome}
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                <Text style={styles.modalTitle}>Roupa:</Text> {item.pessoaRoupa}
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                <Text style={styles.modalTitle}>Cor:</Text> {item.pessoaCor}
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                <Text style={styles.modalTitle}>Sexo:</Text> {item.pessoaSexo}
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                <Text style={styles.modalTitle}>Local de Desaparecimento:</Text> {item.pessoaLocalDesaparecimento}
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                <Text style={styles.modalTitle}>Data de Encontro:</Text> {item.pessoaDtEncontro}
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                <Text style={styles.modalTitle}>Data de Desaparecimento:</Text> {item.pessoaDtDesaparecimento}
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                <Text style={styles.modalTitle}>Status:</Text> {item.pessoaStatus}
              </Text>

              {/* Exibição das observações */}
              {observacoes.length > 0 ? (
                observacoes.map((observacao, index) => (
                  <View key={observacao.observacoesId}>
                    <Text style={[styles.modalText, { color: theme.text }]}>
                      <Text style={styles.modalTitle}>Data da Observação:</Text> {observacao.observacoesData}
                    </Text>
                    <Text style={[styles.modalText, { color: theme.text }]}>
                      <Text style={styles.modalTitle}>Local da Observação:</Text> {observacao.observacoesLocal}
                    </Text>
                    <Text style={[styles.modalText, { color: theme.text }]}>
                      <Text style={styles.modalTitle}>Descrição:</Text> {observacao.observacoesDescricao}
                    </Text>
                    <Text style={[styles.modalText, { color: theme.text }]}>------------------------------------</Text>
                  </View>
                ))
              ) : (
                <Text style={[styles.modalText, { color: theme.text }]}>Sem observações cadastradas</Text>
              )}
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
                color="red"
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
          <View style={[styles.modalView, { backgroundColor: theme.background }]}>
            <Text style={[styles.modalText, { color: theme.text }]}>
              <Text style={styles.modalTitle}>Nova Observação</Text>
            </Text>
            <TextInput
              style={[styles.input, { color: theme.text, backgroundColor: theme.inputBackground }]}
              placeholder="Escreva sua observação"
              placeholderTextColor={theme.placeholder}
              value={descricaoObservacao}
              onChangeText={(digitado) => setDescricaoObservacao(digitado)}
            />
            <TextInput
              style={[styles.input, { color: theme.text, backgroundColor: theme.inputBackground }]}
              placeholder="Escreva o Local da observação"
              placeholderTextColor={theme.placeholder}
              value={localObservacao}
              onChangeText={(digitado) => setLocalObservacao(digitado)}
            />
            <TextInput
              style={[styles.input, { color: theme.text, backgroundColor: theme.inputBackground }]}
              placeholder="Selecionar Data"
              placeholderTextColor={theme.placeholder}
              value={dataObservacao.toLocaleDateString('pt-BR')}
              onFocus={() => setMostrarSelecionarData(true)}
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
                color="red"
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
    borderRadius: 20,
    borderWidth: 1, // Adicionando borda
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
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  textoValue: {
    textAlign: 'center',
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
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
    color: '#848AF9',
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
