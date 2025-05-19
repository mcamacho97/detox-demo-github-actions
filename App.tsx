import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  const manejarEnvio = () => {
    if (nombre && email) {
      Alert.alert('Formulario Enviado', `Nombre: ${nombre}\nEmail: ${email}`);
      // Limpiar campos después del envío
      setNombre('');
      setEmail('');
    } else {
      Alert.alert('Error', 'Por favor completa todos los campos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Formulario de Contacto</Text>

      <View style={styles.formulario}>
        <Text style={styles.etiqueta}>Nombre:</Text>
        <TextInput
          testID='name_input'
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ingresa tu nombre"
        />

        <Text style={styles.etiqueta}>Email:</Text>
        <TextInput
          testID='email_input'
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Ingresa tu email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Button
          testID='send_button'
          title="Enviar"
          onPress={manejarEnvio}
          color="#4CAF50"
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formulario: {
    width: '100%',
    maxWidth: 400,
  },
  etiqueta: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});