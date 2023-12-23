import { useEffect, useState } from 'react';
import { PiShoppingCartFill } from "react-icons/pi";
import ProductList from './components/product-list/ProductList';
import ProductCard from './components/product-card/ProductCard';
import { Button, Modal } from 'react-bootstrap';

import './App.css';

function App() {
  const PATH_URL = 'https://chupaprecios.com.mx/rest/V1';
  const CATALOG_URL = '/chupaprecios/customcatalog/?search=perro&selected_store=amazon&page_num=1';
  const [products, setProducts] = useState({});
  const [cart, setCart] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [productModal, setProductModal] = useState({});

  const getProductsCatalog = (token) => {
    //Fetch Products cataloge when we recieve the token from the first request.
    fetch(PATH_URL + CATALOG_URL, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => response.json())
    .then(json => json[0].data.items)
    .then(json => {
      console.log('products app: ', json);
      return Promise.all(json.map(item => {
        return fetch(`${PATH_URL}/chupaprecios/productdetail/?asin=${item.asin}&selectedStore=amazon`, {
          headers: {Authorization: `Bearer ${token}`}
        })
        .then(data => data.json())
        .then(data => {
            item['description'] = data[0]?.data.item.description;
            return item;
        })
        .catch(error => console.error(error));
      }))
    })
    .then(json => setProducts(json))
    .catch(error => console.error(error));
  }
  
  //Get authorization token and products catalog
  //Note: Credentials are harcoded because we do not have a loging page, also is missing a token
  //validation endpoint so we are requesting the token each time the page is rendered.
  useEffect(() => {
    fetch(PATH_URL + '/integration/admin/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: "candidatoFront",
        password: "Ch8t45t!f"
      })
    })
    .then(data => data.json())
    .then((data) => {
      getProductsCatalog(data);
    })
    .catch(error => console.error(error));
    
  }, []);

  //Function to handle add products to cart
  //Search product to add to cart and close modal confirmation
  const handleAddToCart = (id) => {
    
    setProductModal(products.find(item => item.asin === id));
    setShowModal(true);
  };

  //Function that just close modal confirmation
  const handleClose = () => {
    setShowModal(false);
  };

  //Add 1 to the state counter when add to cart button is clicked
  //Close modal confirmation
  const handleConfirmation = () => {
    setCart(cart + 1);
    setShowModal(false);
  };

  return (
    <div className="App">
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add to cart confirmation!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ProductCard 
            key={productModal.asin} 
            product={productModal}
            handleAddToCart={() => {}}
            isInProductList={false}
        />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmation}>
            Add to cart
          </Button>
        </Modal.Footer>
      </Modal>
      <div data-testid="bar" className='bar'>
        <PiShoppingCartFill />
        <div className='cart-count'> {cart}</div>
      </div>
      {products.length > 0 ? <ProductList 
                                products={products}
                                handleAddToCart={handleAddToCart} 
                              />
                            : <span>Loading...</span>
      }
    </div>
  );
}

export default App;
