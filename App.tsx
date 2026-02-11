import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddContact from './src/component/AddContact';
import Home from './src/component/Home';

const Tab = createMaterialTopTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Liste des contacts" component={Home} />
        <Tab.Screen name="Ajouter un contact" component={AddContact} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
