import {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {ProductsContext} from '../context/productsContext';
import {ProductsStackParams} from '../navigator/ProductsNavigator';

// interface Props extends StackScreenProps<ProductsStackParams, 'Products'> {}

type Props = StackScreenProps<ProductsStackParams, 'Products'>;

// const ProductsScreen: React.FC<Props> = ({navigation})

const ProductsScreen = ({navigation}: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {products, loadProducts} = useContext(ProductsContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 10}}
          onPress={() => navigation.navigate('Product', {})}>
          <Text>Add</Text>
        </TouchableOpacity>
      ),
    });
  });

  const loadProductsFromBackend = async () => {
    setIsRefreshing(true);
    await loadProducts();
    setIsRefreshing(false);
  };

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlatList
        data={products}
        keyExtractor={p => p._id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Product', {
                id: item._id,
                name: item.nombre,
              })
            }>
            <Text style={styles.productName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={loadProductsFromBackend}
          />
        }
      />
    </View>
  );
};
export default ProductsScreen;

const styles = StyleSheet.create({
  productName: {
    fontSize: 20,
  },
  itemSeparator: {
    marginVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
});
