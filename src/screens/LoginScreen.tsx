import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Background from '../components/Background';
import WhiteLogo from '../components/WhiteLogo';
import {loginStyles} from '../theme/loginTheme';
import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

const LoginScreen = ({navigation}: Props) => {
  const {email, password, onChange} = useForm({
    email: '',
    password: '',
  });

  const onLogin = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyles.formContainer}>
          <WhiteLogo />
          <Text style={loginStyles.title}>Login</Text>
          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            placeholder="user@mail.com"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={val => onChange(val, 'email')}
            value={email}
            onSubmitEditing={onLogin}
          />

          <Text style={loginStyles.label}>Password</Text>
          <TextInput
            placeholder="******"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={val => onChange(val, 'password')}
            value={password}
            onSubmitEditing={onLogin}
            secureTextEntry
          />

          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.btn}
              onPress={onLogin}>
              <Text style={loginStyles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{alignItems: 'flex-end', marginTop: 10}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Register')}>
              <Text style={{color: 'white'}}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
export default LoginScreen;
