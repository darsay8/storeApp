import {createContext, useEffect, useState} from 'react';
import {Product, ProductsResponse} from '../interfaces/appInterfaces';
import storeApi from '../api/storeApi';

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

  const uploadImage = async (data: any, productId: string) => {};

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
