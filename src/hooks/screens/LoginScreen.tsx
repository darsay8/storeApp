import {Text, TextInput, View} from 'react-native';
import Background from '../../components/Background';
import WhiteLogo from '../../components/WhiteLogo';
import {loginStyles} from '../../theme/loginTheme';

const LoginScreen = () => {
  return (
    <>
      <Background />
      <WhiteLogo />
      <Text style={loginStyles.title}>Login</Text>
      <Text style={loginStyles.label}>Email</Text>
      <TextInput
        placeholder="user@mail.com"
        placeholderTextColor="rgba(255,255,255,0.4)"
        keyboardType="email-address"
      />
    </>
  );
};
export default LoginScreen;
