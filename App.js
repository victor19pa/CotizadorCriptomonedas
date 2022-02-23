import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
  //hooks state
  const [ moneda, setMoneda ] = useState('')
  const [ criptomoneda, setCriptomoneda ] = useState('')
  const [ consultarAPI, setConsultarAPI ] = useState(false)
  const [ resultado, setResultado ] = useState({})
  const [ cargando, setCargando ] = useState(false)

  //uso de api
  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if(consultarAPI){
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const resultado = await axios.get(url)
        
        setCargando(true)

        setTimeout( () => {
          setResultado(resultado.data.DISPLAY[criptomoneda][moneda])
          //console.log(resultado.PRICE)
          setConsultarAPI(false)
          setCargando(false)
        }, 3000)
      }
    }
    cotizarCriptomoneda()
  }, [consultarAPI])

  const componente = cargando ? <ActivityIndicator size='large' color="#5E49E2"/> : <Cotizacion resultado={resultado} />

  return (
    <>
      <ScrollView>
        {/* componente header */}
        <Header/>
        {/* IMG */}
        <Image 
          style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
        />
        {/* Componente formulario */}
        <View style={styles.contenido}>
          <Formulario
            moneda={ moneda }
            criptomoneda={ criptomoneda }
            setMoneda={ setMoneda }
            setCriptomoneda={ setCriptomoneda }
            setConsultarAPI={ setConsultarAPI }
          />
        </View>
        {/* componente condicional si carga o muestra cotizacion */}
        <View style={{marginTop: 40}}>
          {componente}
        </View>
      </ScrollView>
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
