import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

function Contact({ name, phone, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  arrow: {
    fontSize: 28,
    color: '#d1d5db',
    fontWeight: '300',
    marginLeft: 8,
  },
});

export default Contact;
