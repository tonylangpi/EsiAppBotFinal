import {BASE_URL} from '../components/configApp/configApi'
import axios from 'axios'

export async function getTipoPruebas() {
  try {
    const response = await axios.get(`${BASE_URL}/tiposPruebas/todos`);
    return response.data
  } catch (error) {
    console.error(error);
  }
}

export async function getHistoryChat(id) {
  try {
    const response = await axios.get(`${BASE_URL}/historialChat/chats/${id}`);
    return response.data
  } catch (error) {
    console.error(error);
  }
}

export async function getPreguntasByIdPrueba(id){
  try {
    const response = await axios.get(`${BASE_URL}/preguntas/preguntasByIdTipoPrueba/${id}`);
    return response.data
  } catch (error) {
    console.error(error);
  }
}

export async function registrarRespuestas(arregloRespuestas){
    try {
       const respuesta  = await axios.post(`${BASE_URL}/usuarios/guardarRespuestas`,arregloRespuestas)
       return respuesta.data;
    } catch (error) {
      console.log(error)
    }
}