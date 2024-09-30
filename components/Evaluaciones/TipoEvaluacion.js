import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, ActivityIndicator} from 'react-native';
import { getPreguntasByIdPrueba, registrarRespuestas } from '../../api/evaluacionesConsultas';
import { Authoco } from '../../context/auth.context';
import { useForm, Controller} from 'react-hook-form';

export default Evaluaciones = ({ navigation, route }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [preguntas, setPreguntas] = useState([]);
  const [respuestasIncorrectas, setRespuestasIncorrectas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const { tipoPrueba } = route.params;
  const { userInfo } = useContext(Authoco);

  const obtenerPreguntas = async (id) => {
    const data = await getPreguntasByIdPrueba(id);
    setPreguntas(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await Promise.all([obtenerPreguntas(tipoPrueba.id)])
      setIsLoading(false)
    }
    fetchData()
  }, []);

  const onSubmit = async (data) => {
    let tempScore = 0;
    const respuestas = preguntas.map((question, index) => {
      const correctOption = question.options.find(option => option.correcto);
      const selectedOptionId = data[`question-${question.id}`];

      if (selectedOptionId === correctOption.id) {
        tempScore += 1;
      } else {
        setRespuestasIncorrectas(prev => [
          ...prev,
          {
            question: question.question,
            selectedAnswer: question.options.find(option => option.id === selectedOptionId)?.opcion,
            correctAnswer: correctOption.opcion,
          }
        ]);
      }

      return {
        id_usuario: userInfo.id,
        id_prueba: tipoPrueba.id,
        id_pregunta: question.id,
        id_opcion: selectedOptionId,
        punteo: selectedOptionId === correctOption.id ? 1 : 0,
      };
    });

    setScore(tempScore);

    try {
      const resultado = await registrarRespuestas(respuestas);
      Alert.alert(resultado.message);
      setShowResults(true);
    } catch (error) {
      console.error('Error al enviar las respuestas:', error);
      Alert.alert('Error', 'Hubo un problema al enviar tus respuestas. Inténtalo de nuevo.');
    }
  };

  const renderQuestion = ({ item }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{item.question}</Text>
      <Controller
        control={control}
        name={`question-${item.id}`}
        rules={{ required: 'Debes seleccionar una opción' }}
        render={({ field: { onChange, value } }) => (
          <>
            {item.options.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionButton,
                  value === option.id && styles.selectedOption,
                ]}
                onPress={() => onChange(option.id)}
              >
                <Text style={styles.optionText}>{option.opcion}</Text>
              </TouchableOpacity>
            ))}
            {errors[`question-${item.id}`] && (
              <Text style={styles.errorText}>{errors[`question-${item.id}`].message}</Text>
            )}
          </>
        )}
      />
      {showResults && (
        <View style={styles.resultContainer}>
          {value !== item.options.find(option => option.correcto).id ? (
            <Text style={styles.incorrectText}>
              Incorrecto. Respuesta correcta: {item.options.find(option => option.correcto).opcion}
            </Text>
          ) : (
            <Text style={styles.correctText}>Correcto</Text>
          )}
        </View>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#3399ff" />
        <Text style={styles.loadingText}>Cargando Preguntas...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {showResults ? (
        <>
          <Text style={styles.resultText}>
            Tu puntuación: {score} / {preguntas.length}
          </Text>
          <FlatList
            data={respuestasIncorrectas}
            renderItem={({ item }) => (
              <View style={styles.incorrectAnswerContainer}>
                <Text style={styles.questionText}>{item.question}</Text>
                <Text style={styles.incorrectText}>
                  Tu respuesta: {item.selectedAnswer}
                </Text>
                <Text style={styles.correctText}>
                  Respuesta correcta: {item.correctAnswer}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              navigation.navigate("Evaluaciones");
            }}
          >
            <Text style={styles.submitButtonText}>Regresar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.questionText}>{tipoPrueba.tipo}</Text>
          <Text style={styles.questionText}>Selecciona la opción correcta</Text>
          <FlatList
            data={preguntas}
            renderItem={renderQuestion}
            keyExtractor={(item) => item.id.toString()}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitButtonText}>Enviar Respuestas</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e6def7',
  },
  questionContainer: {
    paddingTop: 30,
    marginBottom: 30,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  optionButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 30
  },
  selectedOption: {
    backgroundColor: '#cce5ff',
    borderColor: '#007bff',
  },
  optionText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#420475',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 50,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  resultText: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  resultContainer: {
    marginTop: 10,
  },
  incorrectText: {
    color: 'red',
  },
  correctText: {
    color: 'green',
  },
  incorrectAnswerContainer: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f8d7da',
  },
  errorText: {
    color: 'red',
    marginTop: 2,
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#e6def7',
    paddingVertical: 1,
    paddingHorizontal: 1,
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
});
