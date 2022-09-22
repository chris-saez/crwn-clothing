import { useContext } from 'react';

import { ProductContext } from '../../contexts/products.context';
import ProductCard from '../../components/product-card/product-card.component';

import './shop.styles.scss';

const Shop = () => {
    const { product } = useContext(ProductContext);
    return (
        <div className='products-container'>
            {product.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default Shop;