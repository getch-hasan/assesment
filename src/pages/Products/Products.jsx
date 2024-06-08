import React, { useEffect, useState } from 'react';
import Product from './Product';
import useProducts from '../../hooks/useProducts';

const Products = () => {
     const {products}=useProducts()
     
    return (
        <div className='grid grid-cols-3 justify-center gap-4 items-center'>
            {products.map(product=><Product key={product.id} product={product}></Product>)}
            
        </div>
    );
};

export default Products;