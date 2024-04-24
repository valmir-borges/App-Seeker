import { Text,  View, StyleSheet, Image } from "react-native";
import { AntDesign, MaterialIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons';

export default function Produto ({item, index}){//Criando um próprio componente para exibir cada produto
//Passando as informações por propriedade
return (
    <View style={styles.boxProduto}>
        <Image source={{uri: item.image}} style={styles.imagemProduto} />
        <View style={{ paddingHorizontal: 20 }}>
            <Text style={styles.textoMain}>Nome do Produto:</Text>
            <Text style={styles.textoValue}>{item.title}</Text>
            <Text style={styles.textoMain}>Categoria do Produto:</Text>
            <Text style={[styles.textoValue, styles.textoCategory]}>{item.category} <FontAwesome name="tag" size={24} color="brown" /></Text>
            <Text style={styles.textoMain}>Preço do Produto:</Text>
            <Text style={[styles.textoValue, styles.textPrice]}> R$: {item.price} <FontAwesome5 name="money-bill-wave" size={24} color="green" /></Text>
            <Text style={styles.textoMain}>Avaliação do Produto:</Text>
            <Text style={[styles.textoValue, styles.textoAvaliacao]}>{item.rating.rate} <AntDesign name="star" size={24} color="#EAD600" /></Text>
        </View>
    </View>
)
}
const styles = StyleSheet.create({
    titleProduto: {
        color: 'white'
    },
    boxProduto: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginBottom: 50
    },
    imagemProduto: {
        width: '100%', 
        height: 200,
        resizeMode: 'stretch',
      },
      textoMain: {
        textAlign: 'center',
        color: '#333',
        marginBottom: 10,
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 20,
        textDecorationLine: 'underline'
    },
    textoValue: {
        textAlign: 'center',
        color: '#000B1D',
        fontSize: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    textoAvaliacao: {
        color: '#EAD600',
        fontWeight: 'bold'
    },
    textPrice: {
        color: 'green',
        fontWeight: 'bold'
    },
    textoCategory:{
        color: 'brown',
        fontWeight: 'bold'
    }
})