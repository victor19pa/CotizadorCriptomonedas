import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import axios, { Axios } from 'axios';


const Formulario = ({moneda, criptomoneda, setMoneda, setCriptomoneda, setConsultarAPI}) => {
    
    const [ criptomonedas, setCriptomonedas ] = useState([])

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD'
            const resultado = await axios.get(url)
            setCriptomonedas(resultado.data.Data)
        }
        consultarAPI()
    },[])

    //almacena los valores del picker moneda
    const obtenerMoneda = (moneda) => {
        setMoneda(moneda)
    }
    const obtenerCriptmoneda = (cripto) => {
        setCriptomoneda(cripto)
    }
    const cotizarPrecio = () => {
        if( moneda.trim() === '' || criptomoneda.trim() === ''){
            mostrarAlerta()
            return
        }
        //se p asa la validacion
        //console.log('cotizando...')
        setConsultarAPI(true)
    }
    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios',
            [
                {text: 'OK'}
            ]
        )
    }

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={ moneda => obtenerMoneda(moneda)}
                itemStyle={{height:120}}
            >
                <Picker.Item label='-Seleccione-' value=""/>
                <Picker.Item label='Dolar USD' value="USD"/>
                <Picker.Item label='Peso MXN' value="MXN"/>
                <Picker.Item label='Euro' value="EUR"/>
                <Picker.Item label='Libra Esterlina' value="GBP"/>
            </Picker>

            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                selectedValue={criptomoneda}
                onValueChange={ cripto => obtenerCriptmoneda(cripto)}
                itemStyle={{height:120}}
            >
                <Picker.Item label='-Seleccione-' value=""/>
                { criptomonedas.map( cripto => (
                    <Picker.Item  
                        key={cripto.CoinInfo.Id}
                        label={cripto.CoinInfo.FullName}
                        value={cripto.CoinInfo.Name}
                    />
                ))}
            </Picker>

            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={ () => cotizarPrecio()}
            >
                <Text style={styles.txtCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    label:{
        fontFamily: 'Lato-Black',
        textTransform:'uppercase',
        fontSize: 22,
        marginVertical: 20,
    },
    btnCotizar:{
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 50,
        marginBottom: 20
    },
    txtCotizar:{
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        color: '#FFF',
        fontSize: 18, 
        textAlign: 'center'
    }
})

export default Formulario