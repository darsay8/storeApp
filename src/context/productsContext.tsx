import {createContext, useEffect, useState} from 'react';
import {Product, ProductsResponse} from '../interfaces/appInterfaces';
import storeApi from '../api/storeApi';
import {Asset, ImagePickerResponse} from 'react-native-image-picker';
import {Platform} from 'react-native';

type ProductsContextProps = {
  products: Product[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Product>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  loadProductById: (productId: string) => Promise<Product>;
  uploadImage: (data: any, productId: string) => Promise<void>;
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({children}: any) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await storeApi.get<ProductsResponse>('/productos?limite=50');
    setProducts([...res.data.productos]);
  };

  const addProduct = async (
    categoryId: string,
    productName: string,
  ): Promise<Product> => {
    const res = await storeApi.post<Product>('/productos', {
      nombre: productName,
      categoria: categoryId,
    });
    setProducts([...products, res.data]);

    return res.data;
  };

  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {
    const res = await storeApi.put<Product>(`/productos/${productId}`, {
      nombre: productName,
      categoria: categoryId,
    });
    setProducts(products.map(p => (p._id === productId ? res.data : p)));
  };

  const deleteProduct = async (productId: string) => {
    const res = await storeApi.delete<Product>(`/productos/${productId}`);
  };

  const loadProductById = async (productId: string): Promise<Product> => {
    const res = await storeApi.get<Product>(`/productos/${productId}`);
    return res.data;
  };

  const uploadImage = async (data: ImagePickerResponse, productId: string) => {
    const formData = new FormData();
    formData.append(
      'archivo',
      JSON.stringify({
        uri:
          Platform.OS === 'ios'
            ? data.assets![0].uri!.replace('file://', '')
            : data.assets![0].uri!,
        type: data.assets![0].type,
        fileName: data.assets![0].fileName,
      }),
    );

    try {
      const res = await storeApi.put<Product>(
        `/uploads/productos${productId}`,
        formData,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        // and an instance of http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
