import {createStackNavigator} from '@react-navigation/stack';
import ProductScreen from '../screens/ProductScreen';
import ProductsScreen from '../screens/ProductsScreen';

export type ProductsStackParams = {
  Products: undefined;
  Product: {id?: string; name?: string};
};

const Stack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: 'white'},
        headerStyle: {elevation: 0, shadowColor: 'transparent'},
      }}>
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{title: 'Products'}}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{title: 'Product'}}
      />
    </Stack.Navigator>
  );
};
export default ProductsNavigator;
