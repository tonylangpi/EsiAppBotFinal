import React from "react";
import { View, Text, Pressable, StyleSheet,ImageBackground, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Logo from '../../assets/FondoPrincipal.png';
import { Authoco } from "../../context/auth.context.js";
import { set } from "react-hook-form";


const Home = ({ navigation }) => {
  const {setIsLoggedIn,setUserInfo} = React.useContext(Authoco);


  return (
    <SafeAreaView style={styles.containerGeneral}>
      <ImageBackground
        source={Logo}
        style={{ flex: 1, resizeMode: "cover", justifyContent: "center"}}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
            fontFamily: "sans-serif-light",
            marginTop: 150,
            marginBottom: 70,
          }}
        >
          Chatea con Esibot
        </Text>
        <View style={styles.containerMenu}>
          <Pressable
            onPress={() => navigation.navigate("Chatbot")}
            style={styles.buttonConfig}
          >
            <Entypo name="chat" size={24} color="black" />
            <Text style={styles.buttonText}>Chatbot</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Evaluaciones")}
            style={styles.buttonConfig}
          >
            <Entypo name="text-document-inverted" size={24} color="black" />
            <Text style={styles.buttonText}>Evaluaciones</Text>
          </Pressable>
          <Pressable
            onPress={() => setIsLoggedIn(false)}
            style={styles.buttonConfig}
          >
            <AntDesign name="logout" size={24} color="black" />
            <Text style={styles.buttonText}>Salir</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    containerGeneral: {
        flex: 1,
    },
    containerMenu:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        flexGrow: 1,
        gap: 5
    },
     buttonConfig: {
        backgroundColor: "#cab8f0",
        padding: 10,
        borderRadius: 10,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        height: 70,
        maxWidth: "100%"
     },
     buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    button: {
      backgroundColor: '#007AFF',
      height: 70,
      borderRadius: 5,
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 5,
      maxWidth: "100%"
  },
  secondaryButton: {
      backgroundColor: "#dc3545",
      maxWidth: "100%"
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 40,
    borderRadius: 50,
  },
    });

export default Home;