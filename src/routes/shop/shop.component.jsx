import SHOP_DATA from '../../shop-data.json';

import { ProductContext } from '../../contexts/products.context';
import { useContext } from 'react';

const Shop = () => {
    const { product } = useContext(ProductContext);

    return (
        <div>
            {product.map(({id,name}) => (
                <div key={id}>
                    <h1>{name}</h1>
                </div>
            ))}
        </div>
    )
}

export default Shop;