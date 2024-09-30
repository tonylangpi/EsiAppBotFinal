import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingChat = () => {
    return (
      <View style={styles.container}>
        <Text>Esi está escribiendo...</Text>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6, // Ajusta el espaciado si es necesario
    alignItems: 'center',
    marginLeft: 15, // Ajusta el espaciado si es necesario
    marginBottom: 15, // Ajusta el espaciado si es necesario
  }
});

export default LoadingChat;