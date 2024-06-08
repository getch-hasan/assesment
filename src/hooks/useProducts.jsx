import { useContext } from 'react';
import { ProductContext } from '../Contex/ProductContext';

const useProducts = () => {
    return useContext(ProductContext);
};
export default useProducts;