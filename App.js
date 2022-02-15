import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Cotizacion from './components/Cotizacion';
import Formulario from './components/Formulario';
import Header from './components/Header';

const App = () => {

  const [ moneda, setMoneda] = useState('')
  const [ criptomoneda, setCriptomoneda ] = useState('')
  const [ consultarAPI, setConsultarAPI ] = useState(false)
  const [ resultado, setResultado ] = useState({})

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if(consultarAPI){
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const resultado = await axios.get(url)

        setResultado(resultado.data.DISPLAY[criptomoneda][moneda])
        //console.log(resultado.PRICE)
        setConsultarAPI(false)
      }
    }
    cotizarCriptomoneda()
  }, [consultarAPI])

  return (
    <>
      <Header/>
      <Image 
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={ moneda }
          criptomoneda={ criptomoneda }
          setMoneda={ setMoneda }
          setCriptomoneda={ setCriptomoneda }
          setConsultarAPI={ setConsultarAPI }
        />
        <Cotizacion
          resultado={resultado}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imagen:{
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido:{
    marginHorizontal: '2.5%'
  }
});

export default App;
