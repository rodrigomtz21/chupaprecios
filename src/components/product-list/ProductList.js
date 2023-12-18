import React, { useEffect } from "react";
import ProductCard from "../product-card/ProductCard";

import './ProductList.css';

//Product List component, recieves products list, and the handler to amanage add products to cart
const ProductList = ({
    products, handleAddToCart
}) => {
    
    return(
        <div className="list-container" data-testid="list-container">
            {products.map(product => (
                <ProductCard 
                    key={product.asin} 
                    product={product}
                    handleAddToCart={handleAddToCart}
                />
            ))}
        </div>
    )
}

export default ProductList;