import { ScrollView, Text, StyleSheet } from 'react-native';

function Home() {
  return (
    <ScrollView style={styles.container}>
      <Text>Bienvenue sur l'application de gestion de tâches !</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
