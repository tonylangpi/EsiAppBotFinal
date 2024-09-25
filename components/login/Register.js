const {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    FlatListComponent,
  } = require('react-native');
  import styles from './Style';
  import Feather from 'react-native-vector-icons/Feather';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Fontisto from 'react-native-vector-icons/Fontisto';
  import { useForm, Controller } from "react-hook-form"
  import {useState, useContext} from 'react';
  import axios from 'axios';
  import { Authoco } from '../../context/auth.context';
  import {BASE_URL} from '../configApp/configApi';
  
  function RegisterPage({navigation}) {
    const [showPassword, setShowPassword] = useState(true);
    const {setIsLoggedIn,setUserInfo} = useContext(Authoco)
   
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm({
        defaultValues: {
          nombre: "",
          apellido:"",
          password: "",
        },
      });// Hook para el formulario con React Hook Form

      const enviar = handleSubmit(async (usuarioNuevo) => {
        try {
         const {data} = await axios.post(`${BASE_URL}/usuarios/crear`, usuarioNuevo);
         if(data.status == 'ok'){
          Alert.alert(`Cuenta creada, Bienvenido ${data.usuario.nombre}`);
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
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        style={{backgroundColor: 'white'}}>
        <View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../assets/Login.png')}
            />
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.text_header}>Registrate!!!</Text>
  
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
              <Fontisto
                name="email"
                color="#420475"
                size={24}
                style={{marginLeft: 0, paddingRight: 5}}
              />
                <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "apellido requerido",
                      }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.textInput}
                        placeholder="Apellido"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCorrect={false}
                        autoCapitalize="none"
                      />
                    )}
                    name="apellido"
                  />
                  {errors.apellido && (
                    <Text style={styles.textError}>{errors.apellido.message}</Text>
                  )}
            </View>
            <View style={styles.action}>
              <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
              <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "contraseña requerida",
                      }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.textInput}
                        placeholder="Contraseña"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCorrect={false}
                        secureTextEntry={showPassword}
                        autoCapitalize="none"
                      />
                    )}
                    name="password"
                  />
                  {errors.password && (
                    <Text style={styles.textError}>{errors.password.message}</Text>
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
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.inBut} onPress={() => enviar()}>
              <View>
                <Text style={styles.textSign}>Registrar</Text>
              </View>
            </TouchableOpacity>
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
                    navigation.navigate('Login');
                  }}>
                  <FontAwesome
                    name="user"
                    color="white"
                    style={[styles.smallIcon2, {fontSize: 30}]}
                  />
                </TouchableOpacity>
                <Text style={styles.bottomText}>Inicio de sesion</Text>
              </View>
            </View>
        </View>
      </ScrollView>
    );
  }
  export default RegisterPage;