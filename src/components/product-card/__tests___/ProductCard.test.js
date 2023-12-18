import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from '../ProductCard';


const product = {
    title: 'Pero Instant Natural Beverage, 7-Ounce Canisters (Pack of 2)',
    description: 'Made from simple, natural ingredients, Pero is a coffee substitute with a similar flavor, but is caffeine-free. Just add water to enjoy this healthful, decaf coffee alternative',
    price : '874.04',
    thumbnail: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81C2s8WfgFL._AC_UL320_.jpg'
}

test("Testing ProductCard component, render component", () => {
    const handleAddToCart = jest.fn();

    const { getByTestId } = render(<ProductCard product={product} handleAddToCart={handleAddToCart}/>);
    
    expect(getByTestId("card")).toBeInTheDocument();
});

test("Testing ProductCard component, display product details", () => {
    const handleAddToCart = jest.fn();

    const { getByTestId } = render(<ProductCard product={product} handleAddToCart={handleAddToCart}/>);
    
    expect(getByTestId("price")).toHaveTextContent("$"+product.price);
    expect(getByTestId("title")).toHaveTextContent(product.title);
    expect(getByTestId("description")).toHaveTextContent(product.description);
});

test("Testing ProductCard component, add to cart button", () => {
    const handleAddToCart = jest.fn();

    const { getByRole } = render(<ProductCard product={product} handleAddToCart={handleAddToCart}/>);
    
    expect(getByRole("button")).toBeInTheDocument();
});

test("Testing ProductCard component,product image" , () => {
    const handleAddToCart = jest.fn();

    const { getByTestId } = render(<ProductCard product={product} handleAddToCart={handleAddToCart}/>);
    
    expect(getByTestId("image")).toBeInTheDocument();
});