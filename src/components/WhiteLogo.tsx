import {Image, View} from 'react-native';

const WhiteLogo = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={require('../assets/img/react-logo-white.png')}
        style={{width: 110, height: 110}}
      />
    </View>
  );
};
export default WhiteLogo;
