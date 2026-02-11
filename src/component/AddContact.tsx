import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddContact({ navigation }: any) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAdd = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires');
      return;
    }

    try {
      const existing = await AsyncStorage.getItem('contacts');
      const contacts = existing ? JSON.parse(existing) : [];

      const newContact = {
        id: Date.now().toString(),
        name: name.trim(),
        phone: phone.trim(),
      };

      contacts.push(newContact);
      await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
      navigation.goBack();
    } catch (error) {
      console.error('Erreur:', error);
      Alert.alert('Erreur', "Impossible d'enregistrer le contact");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.formWrapper}>
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Nouveau Contact</Text>
          <Text style={styles.formSubtitle}>Remplissez les informations</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nom complet</Text>
            <TextInput
              placeholder="Ex: Jean Dupont"
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholderTextColor="#9ca3af"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Téléphone</Text>
            <TextInput
              placeholder="Ex: +33 6 12 34 56 78"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleAdd}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Ajouter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1f2937',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default AddContact;
