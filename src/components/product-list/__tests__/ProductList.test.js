import { render } from '@testing-library/react';
import ProductList from '../ProductList';

const products = [{
    title: 'Pero Instant Natural Beverage, 7-Ounce Canisters (Pack of 2)',
    description: 'Made from simple, natural ingredients, Pero is a coffee substitute with a similar flavor, but is caffeine-free. Just add water to enjoy this healthful, decaf coffee alternative',
    price : '874.04',
    thumbnail: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81C2s8WfgFL._AC_UL320_.jpg'
}];

test('renders learn react link', () => {
    const handleAddToCart = jest.fn();

    const { getByTestId } = render(<ProductList products={products} handleAddToCart={handleAddToCart} />);

    expect(getByTestId("list-container")).toBeInTheDocument();
});