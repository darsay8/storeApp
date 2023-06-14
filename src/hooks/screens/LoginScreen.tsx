import {Platform, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Background from '../../components/Background';
import WhiteLogo from '../../components/WhiteLogo';
import {loginStyles} from '../../theme/loginTheme';

const LoginScreen = () => {
  return (
    <>
      <View style={loginStyles.formContainer}>
        <Background />
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
        />

        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.8} style={loginStyles.btn}>
            <Text style={loginStyles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'flex-end', marginTop: 10}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log('press')}>
            <Text style={{color: 'white'}}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default LoginScreen;
