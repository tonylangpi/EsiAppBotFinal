import React,{useState, useEffect} from "react";
import HomeScreen from './components/home/Home'
import Chatbot from './components/chatbot/Chatbot'
import Login from './components/login/Login'
import Register from './components/login/Register'
import Evaluaciones from './components/Evaluaciones/Evaluaciones'
import TipoEvaluaciones from './components/Evaluaciones/TipoEvaluacion'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Authoco } from "./context/auth.context";

const Stack = createNativeStackNavigator();

export default function Navigation(){
    const {isLogged} = React.useContext(Authoco);
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {isLogged ? (
            <>
              <Stack.Screen
                name="Home"
                options={{ headerShown: false }}
                component={HomeScreen}
              />
              <Stack.Screen name="Chatbot" component={Chatbot} />
              <Stack.Screen name="Evaluaciones" options={{headerShown:false}} component={Evaluaciones} />
              <Stack.Screen name="TipoEvaluacion" component={TipoEvaluaciones} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={Login}
              />
              <Stack.Screen name="Register" options={{headerShown: false}} component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );

}