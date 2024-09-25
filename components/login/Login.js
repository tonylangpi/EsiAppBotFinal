const {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
  } = require('react-native');
  import styles from './Style';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Feather from 'react-native-vector-icons/Feather';
  import {useState, useContext} from 'react';
  import axios from 'axios';
  import { Authoco } from '../../context/auth.context';
  import { useForm, Controller } from "react-hook-form"
  import {BASE_URL} from '../configApp/configApi'
  //import AsyncStorage from '@react-native-async-storage/async-storage';
  
  function LoginPage({navigation}) {
    const {setIsLoggedIn,setUserInfo} = useContext(Authoco)
    const [showPassword, setShowPassword] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm({
        defaultValues: {
          nombre: "",
          password: "",
        },
      });// Hook para el formulario con React Hook Form

      const enviar = handleSubmit(async (usuario) => {
        try {
         const {data} = await axios.post(`${BASE_URL}/usuarios/login`, usuario);
         if(data.status == 'ok'){
           Alert.alert(`Bienvenido ${data.usuario.nombre}`);
           reset();
           setUserInfo(data.usuario);
           setIsLoggedIn(true);
         }else{
            Alert.alert('Acceso Denegado');
            reset();
         }
       } catch (error) {
         console.log(error);
          Alert.alert('Error al intentar acceder');
       }
     });
  
    return (
        <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps={'always'}>
        <View style={{backgroundColor: 'white'}}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../assets/mainLogo.png')}
            />
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.text_header}>EsiApp</Text>
            <View style={styles.action}>
              <FontAwesome
                name="user-o"
                color="#420475"
                style={styles.smallIcon}
              />
              <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "nombre requerido",
                      }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.textInput}
                        placeholder="Nombre"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCorrect={false}
                        autoCapitalize="none"
                      />
                    )}
                    name="nombre"
                  />
                  {errors.nombre && (
                    <Text style={styles.textError}>{errors.nombre.message}</Text>
                  )}
            </View>
            <View style={styles.action}>
              <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
              <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Contraseña requerida",
                      }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.textInput}
                        placeholder="CONTRASEÑA"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={showPassword}
                        autoCorrect={false}
                        autoCapitalize="none"
                      />
                    )}
                    name="password"
                  />
                  {errors.password && (
                    <Text style={styles.textError}>
                      {errors.password.message}
                    </Text>
                  )}
                   <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                { showPassword ? (
                  <Feather
                    name="eye-off"
                    style={{marginRight: -5}}
                    color={'green'}
                    size={23}
                  />
                ) : (
                  <Feather
                    name="eye"
                    style={{marginRight: -10}}
                    color={'green'}
                    size={23}
                  />
                )}
              </TouchableOpacity>
            </View>
            {/* <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginTop: 8,
                marginRight: 10,
              }}>
              <Text style={{color: '#420475', fontWeight: '700'}}>
                Olvidaste tu contraseña?
              </Text>
            </View> */}
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.inBut} onPress={() => enviar()}>
              <View>
                <Text style={styles.textSign}>Ingresar</Text>
              </View>
            </TouchableOpacity>
  
            <View style={{padding: 15}}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: '#919191'}}>
                ----No tienes cuenta----
              </Text>
            </View>
            <View style={styles.bottomButton}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={styles.inBut2}
                  onPress={() => {
                    navigation.navigate('Register');
                  }}>
                  <FontAwesome
                    name="user-plus"
                    color="white"
                    style={[styles.smallIcon2, {fontSize: 30}]}
                  />
                </TouchableOpacity>
                <Text style={styles.bottomText}>Registrarse</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  export default LoginPage;