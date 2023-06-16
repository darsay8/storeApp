import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './src/navigator/Navigator';
import {AuthProvider} from './src/context/authContext';

const AppState = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};
export default App;
