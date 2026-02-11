import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contact from './Contact';

function Home({ navigation }: any) {
  const [contacts, setContacts] = useState<any[]>([]);

  const loadContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem('contacts');
      if (storedContacts !== null) {
        setContacts(JSON.parse(storedContacts));
      } else {
        const initialContacts = [
          { id: '1', name: 'John Doe', phone: '+33 88 88 88 88' },
          { id: '2', name: 'Jane Smith', phone: '+33 99 99 99 99' },
          { id: '3', name: 'Alice Johnson', phone: '+33 77 77 77 77' },
        ];
        await AsyncStorage.setItem('contacts', JSON.stringify(initialContacts));
        setContacts(initialContacts);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadContacts();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes Contacts</Text>
        <Text style={styles.headerCount}>
          {contacts.length} contact{contacts.length > 1 ? 's' : ''}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Ajouter un contact')}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>+ Ajouter un contact</Text>
        </TouchableOpacity>

        {contacts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun contact</Text>
          </View>
        ) : (
          <View style={styles.contactsList}>
            {contacts.map(contact => (
              <Contact
                key={contact.id}
                name={contact.name}
                phone={contact.phone}
                onPress={() => navigation.navigate('Details', { contact })}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#6366f1',
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerCount: {
    fontSize: 15,
    color: '#e0e7ff',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  addButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 0,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  contactsList: {
    marginTop: 8,
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#9ca3af',
    fontWeight: '500',
  },
});

export default Home;
