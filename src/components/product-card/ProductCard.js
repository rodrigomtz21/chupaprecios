import React, { useContext, useEffect, useState } from 'react';

import './ProductCard.css'

//Product List component, displays product detals and recieves 
//products list, and the handler to amanage add products to cart
const ProductCard = ({
    product, handleAddToCart
}) => {
    const { description, title, thumbnail, price } = product;

    return(
        <div className='card' data-testid='card'>
            <div className='image-container'>
                <img src={thumbnail} alt={title} className='image' data-testid="image"/>
            </div>
            <h6 className='title' data-testid="title">{title}</h6>
            <details>
                <summary>Product description</summary>
                <p className='description' data-testid="description">{description}</p>
            </details>
            <p className='price' data-testid='price'>${price}</p>
            <button type="button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
    )
}

export default ProductCard;