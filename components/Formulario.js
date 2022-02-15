import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import axios, { Axios } from 'axios';

const Formulario = () => {
    
    const [ moneda, setMoneda] = useState('')
    const [ criptomoneda, setCriptomoneda ] = useState('')
    const [ criptomonedas, setCriptomonedas ] = useState('')

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD'
            const resultado = await axios.get(url)
            setCriptomonedas(resultado.data.Data)
        }
        consultarAPI()
    },[])

    const obtenerMoneda = (moneda) => {
        setMoneda(moneda)
    }

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={moneda}
                onValueChange={ moneda => obtenerMoneda(moneda)}
            >
                <Picker.Item label='-Seleccione-' value=""/>
                <Picker.Item label='Dolar USD' value="USD"/>
                <Picker.Item label='Peso MXN' value="MXN"/>
                <Picker.Item label='Euro' value="EUR"/>
                <Picker.Item label='Libra Esterlina' value="GBP"/>
            </Picker>

            <Text style={styles.label}>Criptomoneda</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    label:{
        fontFamily: 'Lato-Black',
        textTransform:'uppercase',
        fontSize: 22,
        marginVertical: 20,
    }
})

export default Formulario