import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../hooks/screens/LoginScreen';
import RegisterScreen from '../hooks/screens/RegisterScreen';
import ProtectedScreen from '../hooks/screens/ProtectedScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Protected" component={ProtectedScreen} />
    </Stack.Navigator>
  );
};
