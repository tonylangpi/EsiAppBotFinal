import React, { useState, useCallback, useEffect, useContext } from 'react'
// import { KeyboardAvoidingView} from 'react-native'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { GiftedChat} from 'react-native-gifted-chat'
import axios from 'axios'
import Typing from './LoadingChat'
import LogoChatbot from '../../assets/mainLogo.png'
import { Authoco } from '../../context/auth.context';
import {BASE_URL} from '../configApp/configApi'

export default function Chatbot() {
  const [messages, setMessages] = useState([])
 const [typing, setTyping] = useState(false)
 const {userInfo} = useContext(Authoco)
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `Hola amigo soy Esi, y estoy aqui para que aprendas sobre Educacion sexual integral, puedes preguntarme cualquier cosa, estoy aqui para ayudarte
                posibles preguntas
                1. ¿Qué es la educación sexual integral?
                2. ¿Qué es la sexualidad?
                3. ¿Qué metodos anticonceptivos existen?
                4. ¿Cuales son las hormonas sexuales?
                5. Enfermedades de transmision sexual, etc.
                6. ¿Como prevenir embarazos no deseados?
                7. ¿Como prevenir las enfermedades de transmision sexual?
                8. Los derechos reproductivos
                9. los derechos sexuales.
              `,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Esi',
          avatar: LogoChatbot
        },
      },
    ])
  }, [])

  const onSend = useCallback(async(messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
       setTyping(true)
       const userMessage = {
         query: messages[0].text,
         idUsuario: userInfo.id
       } //obtenemos el mensaje del usuario
       const {data} = await axios.post(`${BASE_URL}/chatbot/chat`, userMessage);
        if(data){
          setTyping(false)
        }
        setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [
            {
                _id: Math.round(Math.random() * 1000000),
                text: data,
                createdAt: new Date(),
                user: { _id: 2, name: "Esi", avatar: LogoChatbot },
            },
        ])
    );
  }, [])

  return (
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        isTyping={typing}
        renderFooter={() => {
          return typing ? <Typing /> : null;
        }}
      />
  );
}