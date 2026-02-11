import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Details({ route, navigation }: any) {
  if (!route.params || !route.params.contact) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aucun contact sélectionné</Text>
      </View>
    );
  }

  const { contact } = route.params;

  const handleDelete = () => {
    Alert.alert(
      'Confirmation',
      `Voulez-vous vraiment supprimer ${contact.name} ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              const stored = await AsyncStorage.getItem('contacts');
              const contacts = stored ? JSON.parse(stored) : [];
              const updated = contacts.filter((c: any) => c.id !== contact.id);
              await AsyncStorage.setItem('contacts', JSON.stringify(updated));
              navigation.navigate('Accueil');
            } catch (error) {
              console.error('Erreur:', error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {contact.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.contactName}>{contact.name}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Informations</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nom</Text>
            <Text style={styles.infoValue}>{contact.name}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Téléphone</Text>
            <Text style={styles.infoValue}>{contact.phone}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.8}
        >
          <Text style={styles.deleteButtonText}>Supprimer le contact</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
  },
  contactName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoRow: {
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1f2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 4,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 0,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default Details;
