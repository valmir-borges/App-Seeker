import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Modal, Button } from "react-native";

export default function Pessoa({ item, index }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <View style={styles.boxPessoa}>
        <Image source={{ uri: item.pessoaFoto }} style={styles.imagemPessoa} />
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.textoValue}>{item.pessoaNome}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>DETALHES</Text>
      </TouchableOpacity>
      </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Image source={{ uri: item.pessoaFoto }} style={styles.imagemPessoa} />
            <Text style={styles.modalText}><Text style={styles.modalTitle}>Nome:</Text> {item.pessoaNome}</Text>
            <Text style={styles.modalText}><Text style={styles.modalTitle}>Idade:</Text> {item.pessoaIdade}</Text>
            <Text style={styles.modalText}><Text style={styles.modalTitle}>Roupa:</Text> {item.pessoaRoupa}</Text>
            <Text style={styles.modalText}><Text style={styles.modalTitle}>Cor:</Text> {item.pessoaCor}</Text>
            <Text style={styles.modalText}><Text style={styles.modalTitle}>Sexo:</Text> {item.pessoaSexo}</Text>
            <Text style={styles.modalText}><Text style={styles.modalTitle}>Observação:</Text> {item.pessoaObservacao}</Text>
            <Text style={styles.modalText}><Text style={styles.modalTitle}>Local de Desaparecimento:</Text> {item.pessoaLocalDesaparecimento}</Text>
            <Text style={styles.modalText}><Text style={styles.modalTitle}>Data de Encontro:</Text> {item.pessoaDtEncontro}</Text>
            <Text style={styles.modalText}><Text style={styles.modalTitle}>Data de Desaparecimento:</Text> {item.pessoaDtDesaparecimento}</Text>
            <Text style={styles.modalText}><Text style={styles.modalTitle}>Status:</Text> {item.pessoaStatus}</Text>
            <Button
              title="Fechar"
              onPress={() => setModalVisible(!modalVisible)}
            />
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
  textoValue: {
    textAlign: 'center',
    color: '#000B1D',
    fontSize: 20,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  modalTitle: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FABB57',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
