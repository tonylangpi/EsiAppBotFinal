import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import {getTipoPruebas, getHistoryChat} from '../../api/evaluacionesConsultas'
import { Authoco } from '../../context/auth.context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default Evaluaciones = ({navigation}) => {
 const [tiposPruebas, setTiposPruebas] = useState([])
 const [historialChat, setHistorialChat] = useState([])
 const [isLoading, setIsLoading] = useState(true)
 const {userInfo} = useContext(Authoco)

 const obtenerTipoPruebas = async () => {
    const data  = await getTipoPruebas()
    setTiposPruebas(data)
 }

 const obtenerHistorialChat = async (id) => {
    const data  = await getHistoryChat(id)
    setHistorialChat(data)
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await Promise.all([obtenerTipoPruebas(), obtenerHistorialChat(userInfo.id)])
      setIsLoading(false)
    }
    fetchData()
  },[])


  const clickEventListener = item => {
    navigation.navigate('TipoEvaluacion', {tipoPrueba: item})
  }

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#3399ff" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    )
  }


  return (
      historialChat.length > 0 ? (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center', fontSize: 20, color: '#3399ff', fontWeight: 'bold' }}>
            Pruebas
          </Text>
          <FlatList
            style={styles.contentList}
            data={tiposPruebas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={styles.card} onPress={() => clickEventListener(item)}>
                  <Image style={styles.image} source={{ uri: item.imagen }} />
                  <View style={styles.cardContent}>
                    <Text style={styles.name}>{item.tipo}</Text>
                    <Text style={styles.count}>{item.descripcion}</Text>
                    <Text style={styles.intentosStyle}>Intentos maximos: {item.intentos_max}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center', fontSize: 20, color: '#3399ff', fontWeight: 'bold' }}>
            No hay historial de chat,
            antes de hacerte pruebas discute con EsiBot
          </Text>
          <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20
                }}>
                <TouchableOpacity
                  style={styles.inBut2}
                  onPress={() => {
                    navigation.navigate('Chatbot');
                  }}>
                  <FontAwesome
                    name="wechat"
                    color="white"
                    style={[styles.smallIcon2, {fontSize: 30}]}
                  />
                </TouchableOpacity>
                <Text style={styles.bottomText}>Hablar con Esi</Text>
              </View>
        </View>
      )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 6,
    backgroundColor: '#420475',
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginTop: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#ebf0f7',
  },
  inBut2: {
    backgroundColor: '#420475',
    height: 65,
    width: 65,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallIcon2: {
    fontSize: 40,
    // marginRight: 10,
  },
  bottomText: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 10,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: '#cab8f0',
    padding: 40,
    flexDirection: 'row',
    borderRadius: 20,
  },

  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#3399ff',
    fontWeight: 'bold',
  },
  count: {
    fontSize: 10,
    flex: 1,
    alignSelf: 'center',
    color: '#6666ff',
  },
  intentosStyle:{
    color: '#cf0000',
    fontSize: 12,
    flex: 1,
    alignSelf: 'center'
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#3399ff',
    fontSize: 16,
    marginTop: 10,
  }
})
