import {useEffect, useState} from 'react';
import storeApi from '../api/storeApi';
import {CategoriesResponse, Category} from '../interfaces/appInterfaces';

const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const res = await storeApi.get<CategoriesResponse>('/categorias');
    setCategories(res.data.categorias);
    setIsLoading(false);
  };

  return {isLoading, categories};
};
export default useCategories;
