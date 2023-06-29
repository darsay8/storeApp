import {useContext, useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import useCategories from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/productsContext';

interface Props extends StackScreenProps<ProductsStackParams, 'Product'> {}

const ProductScreen = ({navigation, route}: Props) => {
  const {id = '', name = ''} = route.params;

  const [tempUri, setTempUri] = useState<string>();

  const {loadProductById, addProduct, updateProduct, uploadImage} =
    useContext(ProductsContext);

  const {categories} = useCategories();

  const {_id, categoriaId, nombre, img, form, onChange, setFormValue} = useForm(
    {
      _id: id,
      categoriaId: '',
      nombre: name,
      img: '',
    },
  );

  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Product Name',
    });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length === 0) return;
    const product = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      nombre: name,
      img: product.img || '',
    });
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id);
    } else {
      const tempCategoryId = categoriaId || categories[0]._id;
      const newProduct = await addProduct(tempCategoryId, nombre);
      onChange(newProduct._id, '_id');
    }
  };

  const takePhoto = () => {
    launchCamera(
      {mediaType: 'photo', quality: 0.5, cameraType: 'back'},
      res => {
        if (res.didCancel) return;
        if (!res.assets || !res.assets[0] || !res.assets[0].uri) return;
        setTempUri(res.assets![0].uri);
        uploadImage(res, _id);
      },
    );
  };

  const takePhotoFromGallery = () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.5}, res => {
      if (res.didCancel) return;
      if (!res.assets || !res.assets[0] || !res.assets[0].uri) return;
      setTempUri(res.assets![0].uri);
      uploadImage(res, _id);
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Product Name:</Text>
        <TextInput
          placeholder="Product"
          style={styles.textInput}
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
        />
        <Text style={styles.label}>Category:</Text>

        <Picker
          selectedValue={categoriaId}
          onValueChange={itemValue => onChange(itemValue, 'categoriaId')}>
          {categories.map(c => (
            <Picker.Item label={c.nombre} value={c._id} key={c._id} />
          ))}
        </Picker>

        <Button title="Save" onPress={saveOrUpdate} color="#5856d6" />

        {_id.length > 0 && (
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button title="Camera" onPress={takePhoto} color="#5856d6" />
            <View style={{width: 10}} />
            <Button
              title="Gallery"
              onPress={takePhotoFromGallery}
              color="#5856d6"
            />
          </View>
        )}

        {img.length > 0 && (
          <Image
            source={{uri: img}}
            style={{width: '100%', height: 300, marginTop: 20}}
          />
        )}
        {tempUri && (
          <Image
            source={{uri: tempUri}}
            style={{width: '100%', height: 300, marginTop: 20}}
          />
        )}
      </ScrollView>
    </View>
  );
};
export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
  },
  textInput: {
    marginTop: 14,
    marginBottom: 22,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 40,
  },
});
