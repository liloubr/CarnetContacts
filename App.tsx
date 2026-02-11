import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddContact from './src/component/AddContact';
import Home from './src/component/Home';
import Detail from './src/component/Details';

const Tab = createMaterialTopTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Accueil" component={Home} />
        <Tab.Screen name="Ajouter un contact" component={AddContact} />
        <Tab.Screen name="Details" component={Detail}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
