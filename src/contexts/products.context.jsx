import { createContext, useState, useEffect } from 'react';

import SHOP_DATA from '../shop-data.json';


export const ProductContext = createContext({
    product: [],
})

export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState(SHOP_DATA);
    const value = { product, setProduct };

    return <ProductContext.Provider value={ value }> 
        {' '}
        {children} 
    </ProductContext.Provider>
}