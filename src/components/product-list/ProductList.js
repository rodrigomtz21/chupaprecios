import React from "react";
import ProductCard from "../product-card/ProductCard";
import { Container, Row } from 'react-bootstrap';

import './ProductList.css';

//Product List component, recieves products list, and the handler to amanage add products to cart
const ProductList = ({
    products, handleAddToCart
}) => {
    
    return(
        <Container fluid className="list-container" data-testid="list-container">
            <Row xs={2} md={3} lg={4}>
                {products.map(product => (
                    <ProductCard 
                        key={`${product.asin} ${product.title}`} 
                        product={product}
                        handleAddToCart={handleAddToCart}
                    />
                ))}
            </Row>
        </Container>
    )
}

export default ProductList;